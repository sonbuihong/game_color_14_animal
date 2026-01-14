import { hideGameButtons, sdk } from '../main';
import { phaser } from '@iruka-edu/mini-game-sdk';
import { play, stopAll } from '../audio/audio';
import { game } from "@iruka-edu/mini-game-sdk";

const { createEndGameScene } = phaser;
game.prepareSubmitData();

export const EndGameScene = createEndGameScene({
    sceneKey: 'EndGameScene',
    assets: {
        banner: {
            key: 'banner_congrat',
            url: 'assets/images/ui/banner_congrat.png',
        },
        icon: { key: 'icon', url: 'assets/images/ui/icon.png' },
        replayBtn: { key: 'btn_reset', url: 'assets/images/ui/btn_reset.png' },
        exitBtn: { key: 'btn_exit', url: 'assets/images/ui/btn_exit.png' },
    },
    audio: {
        play: (k) => play(k),
        stopAll: () => stopAll(),
    },
    sounds: {
        enter: 'complete',
        fireworks: 'fireworks',
        applause: 'applause',
        click: 'sfx_click',
    },
    replaySceneKey: 'CompareScene',
    onEnter: () => hideGameButtons(),
    reportComplete: (payload) => {
        sdk.complete(payload);
    },
});
