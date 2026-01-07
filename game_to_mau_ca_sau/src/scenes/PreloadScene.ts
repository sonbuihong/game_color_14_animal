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
        this.load.image(TextureKeys.S1_Banner, 'assets/images/S1/banner_s2.png');
        this.load.image(TextureKeys.S1_BannerText, 'assets/images/S1/banner_text_ca_sau.png');
        this.load.image(TextureKeys.S1_Board, 'assets/images/bg/board_scene_2.png');

        // - Con Cá Sấu (Mapped to S1 Keys)
        this.load.image(TextureKeys.S1_Casau_Template, 'assets/images/S1/ca_sau_template.png');
        this.load.image(TextureKeys.S1_Casau_Frame, 'assets/images/S1/frame.png');
        this.load.image(TextureKeys.S1_Casau_Name, 'assets/images/S1/ca_sau_name.png');
        this.load.image(TextureKeys.S1_Casau_Name_Bg, 'assets/images/S1/ca_sau_name_bg.png');
        this.load.image(TextureKeys.S1_Casau_Outline, 'assets/images/S1/ca_sau_outline.png');
        this.load.image(TextureKeys.S1_Casau_1, 'assets/images/S1/ca_sau_1.png');

        // Bảng màu Scene 1 (Crocodile Colors)
        this.load.image(TextureKeys.BtnS1White, 'assets/images/color2/white.png');
        this.load.image(TextureKeys.BtnS1Cream, 'assets/images/color2/cream.png');
        this.load.image(TextureKeys.BtnS1Green1, 'assets/images/color2/green1.png');
        this.load.image(TextureKeys.BtnS1Green2, 'assets/images/color2/green2.png');
        this.load.image(TextureKeys.BtnS1Green4, 'assets/images/color2/green4.png');

        // - Config JSON
        // Lưu ý: File json gốc là level_s1_config.json, nhưng ta load vào key LevelS1Config
        this.load.json(DataKeys.LevelS1Config, 'assets/data/level_s1_config.json');

        // 4. End Game Assets
        this.load.image(TextureKeys.End_Icon, 'assets/images/ui/icon_end.png');
        this.load.image(TextureKeys.End_BannerCongrat, 'assets/images/bg/banner_congrat.png');

        // 5. Audio (Phaser)
        // Lưu ý: Key BgmNen đã được define trong Keys.ts, và file âm thanh này dùng chung
        this.load.audio(AudioKeys.BgmNen, 'assets/audio/sfx/nhac_nen.mp3');
    }

    create() {
        // Tải xong thì chuyển sang Scene1
        this.scene.start(SceneKeys.Scene1);
    }
}