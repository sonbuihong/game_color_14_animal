// src/scenes/PreloadScene.ts
import Phaser from 'phaser';
import { SceneKeys, TextureKeys, AudioKeys, DataKeys } from '../consts/Keys';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preload);
    }

    preload() {
        // 1. UI Chung
        this.load.image(TextureKeys.BtnExit, 'assets/images/ui/btn_exit.png');
        this.load.image(TextureKeys.BtnReset, 'assets/images/ui/btn_reset.png');
        this.load.image(TextureKeys.BtnEraser, 'assets/images/ui/btn_eraser.png');
        this.load.image(TextureKeys.HandHint, 'assets/images/ui/hand.png');
        
        this.load.image(TextureKeys.BoardRight, 'assets/images/bg/right_board.png');

        // --- Scene 1 (Crocodile) Assets ---
        this.load.image(TextureKeys.S1_Banner, 'assets/images/S2/banner_s2.png');
        this.load.image(TextureKeys.S1_BannerText, 'assets/images/S2/banner_text_ca_sau.png');
        this.load.image(TextureKeys.S1_Board, 'assets/images/bg/board_scene_2.png');

        // - Con Cá Sấu (Mapped to S1 Keys)
        this.load.image(TextureKeys.S1_Casau_Template, 'assets/images/S2/ca_sau_template.png');
        this.load.image(TextureKeys.S1_Casau_Frame, 'assets/images/S2/frame.png');
        this.load.image(TextureKeys.S1_Casau_Name, 'assets/images/S2/ca_sau_name.png');
        this.load.image(TextureKeys.S1_Casau_Name_Bg, 'assets/images/S2/ca_sau_name_bg.png');
        this.load.image(TextureKeys.S1_Casau_Outline, 'assets/images/S2/ca_sau_outline.png');
        this.load.image(TextureKeys.S1_Casau_1, 'assets/images/S2/ca_sau_1.png');
        this.load.image(TextureKeys.S1_Casau_2, 'assets/images/S2/ca_sau_2.png');
        this.load.image(TextureKeys.S1_Casau_3, 'assets/images/S2/ca_sau_3.png');
        this.load.image(TextureKeys.S1_Casau_4, 'assets/images/S2/ca_sau_4.png');

        // Bảng màu Scene 1 (Crocodile Colors)
        this.load.image(TextureKeys.BtnS2White, 'assets/images/color2/white.png');
        this.load.image(TextureKeys.BtnS2Cream, 'assets/images/color2/cream.png');
        this.load.image(TextureKeys.BtnS2Green1, 'assets/images/color2/green1.png');
        this.load.image(TextureKeys.BtnS2Green2, 'assets/images/color2/green2.png');
        this.load.image(TextureKeys.BtnS2Green4, 'assets/images/color2/green4.png');

        // - Config JSON
        // Lưu ý: File json gốc là level_s2_config.json, nhưng ta load vào key LevelS1Config
        this.load.json(DataKeys.LevelS1Config, 'assets/data/level_s2_config.json');

        // 4. End Game Assets
        this.load.image(TextureKeys.End_Icon, 'assets/images/ui/icon_end.png');
        this.load.image(TextureKeys.End_BannerCongrat, 'assets/images/bg/banner_congrat.png');

        // 5. Audio (Phaser)
        // Lưu ý: Key BgmNen đã được define trong Keys.ts, và file âm thanh này dùng chung
        this.load.audio(AudioKeys.BgmNen, 'assets/audio/sfx/nhac_nen.mp3');
        // Load thêm các SFX nếu cần, ví dụ sfx-correct_s2, tin, hint... 
        // Nếu Audio Manager tự load ở ngoài thì không cần preload scene này, nhưng thường Phaser cần preload.
        // Tuy nhiên AudioManager có thể dùng Audio (HTML5) hoặc Phaser Sound. Base code dùng Phaser Sound preload ở đây cho chắc.
        this.load.audio('sfx-correct_s2', 'assets/audio/sfx/correct_s2.mp3');
        this.load.audio('sfx-ting', 'assets/audio/sfx/ting.mp3');
        this.load.audio('hint', 'assets/audio/sfx/hint.mp3');
        this.load.audio('voice_intro_s2', 'assets/audio/voice/instruction_s2.mp3'); 
        this.load.audio('sfx-click', 'assets/audio/sfx/click.mp3');
    }

    create() {
        // Tải xong thì chuyển sang Scene1
        this.scene.start(SceneKeys.Scene1);
    }
}