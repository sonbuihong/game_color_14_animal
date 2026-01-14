import Phaser from 'phaser';
import { CompareScene } from './scenes/CompareScene';
import { EndGameScene } from './scenes/EndGameScene';
import { initRotateOrientation } from './rotateOrientation';
import PreloadScene from './scenes/PreloadScene';
import { initAudio, audio } from "./audio/audio";
import { game } from "@iruka-edu/mini-game-sdk";
import { installIrukaE2E } from './e2e/installIrukaE2E';

declare global {
    interface Window {
        compareScene: any;
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    scene: [PreloadScene, CompareScene, EndGameScene],
    scale: {
        mode: Phaser.Scale.FIT, // Canvas tự fit vào container
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
        pixelArt: false,
        antialias: true,
        transparent: true,
    },
};

const gamePhaser = new Phaser.Game(config);

// import { isIrukaEnvelope, setSessionIdFromHub, sendToHub } from './irukaBridge';

function applyResize(width: number, height: number) {
    const gameDiv = document.getElementById('game-container');
    if (gameDiv) {
        gameDiv.style.width = `${width}px`;
        gameDiv.style.height = `${height}px`;
    }
    // Phaser Scale FIT: gọi resize để canvas update
    gamePhaser.scale.resize(width, height);
}

function broadcastSetState(payload: any) {
    // chuyển xuống scene đang chạy để bạn route helper (audio/score/timer/result...)
    const scene = gamePhaser.scene.getScenes(true)[0] as any;
    scene?.applyHubState?.(payload);
}

// lấy hubOrigin: tốt nhất từ query param, fallback document.referrer
function getHubOrigin(): string {
  const qs = new URLSearchParams(window.location.search);
  const o = qs.get("hubOrigin");
  if (o) return o;

  // fallback: origin của referrer (hub)
  try {
    const ref = document.referrer;
    if (ref) return new URL(ref).origin;
  } catch {}
  return "*"; // nếu protocol của bạn bắt buộc origin cụ thể thì KHÔNG dùng "*"
}

export const sdk = game.createGameSdk({
  hubOrigin: getHubOrigin(),

  onInit(ctx) {
    // reset stats session nếu bạn muốn
    // game.resetAll(); hoặc statsCore.resetAll()

    // báo READY sau INIT
    sdk.ready({
      capabilities: ["resize", "score", "complete", "save_load", "set_state"],
    });
  },

  onStart() {
    gamePhaser.scene.resume("CompareScene");
    gamePhaser.scene.resume("EndGameScene");
  },

  onPause() {
    gamePhaser.scene.pause("CompareScene");
  },

  onResume() {
    gamePhaser.scene.resume("CompareScene");
  },

  onResize(size) {
    applyResize(size.width, size.height);
  },

  onSetState(state) {
    broadcastSetState(state);
  },

  onQuit() {
    // QUIT: chốt attempt là quit + gửi complete
    game.finalizeAttempt("quit");
    sdk.complete({
      timeMs: Date.now() - ((window as any).irukaGameState?.startTime ?? Date.now()),
      extras: { reason: "hub_quit", stats: game.prepareSubmitData() },
    });
  },
});

installIrukaE2E(sdk);

let firstTapHandled = false;

const container = document.getElementById('game-container');
if (container) {
    container.addEventListener(
        'pointerup',
        () => {
            if (firstTapHandled) return;
            firstTapHandled = true;

            // đây là gesture thật trên game-container
            // 1) đánh dấu đã unlock audio
            const compareScene = gamePhaser.scene.getScene('CompareScene') as any;
            if (
                compareScene &&
                typeof compareScene.unlockFirstPrompt === 'function'
            ) {
                compareScene.unlockFirstPrompt();
                sdk.progress({ audioUnlocked: true });
            }
        },
        { once: true, passive: true }
    );
}

function resizeGame() {
    const gameDiv = document.getElementById('game-container');

    const w = window.innerWidth;
    const h = window.innerHeight;

    if (gameDiv) {
        gameDiv.style.transform = '';
        gameDiv.style.width = `${w}px`;
        gameDiv.style.height = `${h}px`;
    }
}

window.addEventListener('resize', () => {
    resizeGame();
});
window.addEventListener('orientationchange', () => {
    resizeGame();
});

function updateUIButtonScale() {
    const container = document.getElementById('game-container')!;
    const resetBtn = document.getElementById('btn-reset') as HTMLImageElement;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // base height = 720 (game design gốc)
    const scale = Math.min(w, h) / 720;

    const baseSize = 80; // kích thước nút thiết kế gốc (80px)
    const newSize = baseSize * scale;

    resetBtn.style.width = `${newSize}px`;
    resetBtn.style.height = 'auto';
}

export function showGameButtons() {
    const reset = document.getElementById('btn-reset');

    reset!.style.display = 'block';
}

export function hideGameButtons() {
    const reset = document.getElementById('btn-reset');

    reset!.style.display = 'none';
}

// Khởi tạo xoay màn hình
initRotateOrientation(gamePhaser);

// Scale nút
updateUIButtonScale();
window.addEventListener('resize', updateUIButtonScale);
window.addEventListener('orientationchange', updateUIButtonScale);

document.getElementById('btn-reset')?.addEventListener('click', () => {
    window.compareScene?.restartGame();
});

// Không dùng top-level await nữa
async function bootstrapAudio() {
  await initAudio();
  // bind unlock gesture vào container game (để iOS/Chrome happy)
  const el = document.getElementById('game-container');
  if (el) audio.bindUnlockToGesture(el);
}

bootstrapAudio().catch((err) => {
  console.error('[audio] init failed', err);
});