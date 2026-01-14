// src/audio.ts
import { phaser } from "@iruka-edu/mini-game-sdk";
export const audio = new phaser.HowlerAudioManager({ debug: true });

export async function initAudio() {
  await audio.register([
    // SFX
    { key: "sfx-correct", kind: "sfx", basePath: "assets/audio/sfx/correct", exts: ["mp3"] },
    { key: "sfx-wrong", kind: "sfx", basePath: "assets/audio/sfx/wrong", exts: ["mp3"] },
    { key: "sfx-click", kind: "sfx", basePath: "assets/audio/sfx/click", exts: ["mp3"] },
    { key: "voice-rotate", kind: "voice", basePath: "assets/audio/sfx/rotate", exts: ["mp3"] },

    // Voices
    { key: "correct_answer_1", kind: "voice", basePath: "assets/audio/sfx/correct_answer_1", exts: ["mp3"] },
    { key: "correct_answer_2", kind: "voice", basePath: "assets/audio/sfx/correct_answer_2", exts: ["mp3"] },
    { key: "correct_answer_3", kind: "voice", basePath: "assets/audio/sfx/correct_answer_3", exts: ["mp3"] },
    { key: "correct_answer_4", kind: "voice", basePath: "assets/audio/sfx/correct_answer_4", exts: ["mp3"] },

    { key: "prompt_less_cat", kind: "voice", basePath: "assets/audio/prompt/prompt_less_cat", exts: ["mp3"] },
    { key: "prompt_more_cat", kind: "voice", basePath: "assets/audio/prompt/prompt_more_cat", exts: ["mp3"] },
    { key: "prompt_less_chicken", kind: "voice", basePath: "assets/audio/prompt/prompt_less_chicken", exts: ["mp3"] },
    { key: "prompt_more_chicken", kind: "voice", basePath: "assets/audio/prompt/prompt_more_chicken", exts: ["mp3"] },
    { key: "prompt_less_cow", kind: "voice", basePath: "assets/audio/prompt/prompt_less_cow", exts: ["mp3"] },
    { key: "prompt_more_cow", kind: "voice", basePath: "assets/audio/prompt/prompt_more_cow", exts: ["mp3"] },
    { key: "prompt_less_dog", kind: "voice", basePath: "assets/audio/prompt/prompt_less_dog", exts: ["mp3"] },
    { key: "prompt_more_dog", kind: "voice", basePath: "assets/audio/prompt/prompt_more_dog", exts: ["mp3"] },
    { key: "prompt_less_dolphin", kind: "voice", basePath: "assets/audio/prompt/prompt_less_dolphin", exts: ["mp3"] },
    { key: "prompt_more_dolphin", kind: "voice", basePath: "assets/audio/prompt/prompt_more_dolphin", exts: ["mp3"] },
    { key: "prompt_less_monkey", kind: "voice", basePath: "assets/audio/prompt/prompt_less_monkey", exts: ["mp3"] },
    { key: "prompt_more_monkey", kind: "voice", basePath: "assets/audio/prompt/prompt_more_monkey", exts: ["mp3"] },
    { key: "prompt_less_turtle", kind: "voice", basePath: "assets/audio/prompt/prompt_less_turtle", exts: ["mp3"] },
    { key: "prompt_more_turtle", kind: "voice", basePath: "assets/audio/prompt/prompt_more_turtle", exts: ["mp3"] },
    // ... các prompt khác ...

    { key: "complete", kind: "sfx", basePath: "assets/audio/sfx/complete", exts: ["mp3"] },
    { key: "fireworks", kind: "sfx", basePath: "assets/audio/sfx/fireworks", exts: ["mp3"] },
    { key: "applause", kind: "sfx", basePath: "assets/audio/sfx/applause", exts: ["mp3"] },
  ]);

  // preload tất cả (giống AudioManager cũ)
  await audio.loadAll({ strict: true });
}

// API giống game cũ (để bạn khỏi sửa nhiều nơi)
export function play(id: string) {
  // tự bạn chọn mapping: sfx/voice; mình gợi ý:
  if (id.startsWith("prompt_") || id.startsWith("correct_answer_") || id.startsWith("voice-")) {
    return audio.playVoice(id);
  }
  return audio.playSfx(id);
}

export function stopAll() {
  audio.stopAll();
}

export function stopAllVoicePrompts() {
  audio.stopAllVoices();
}

export function playCorrectAnswer() {
  const n = Math.floor(Math.random() * 4) + 1;
  play(`correct_answer_${n}`);
}

export function playPrompt(type: "less" | "more", animal: string) {
  play(`prompt_${type}_${animal}`);
}
