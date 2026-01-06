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

        // 4. End Game Assets
        this.load.image(TextureKeys.End_Icon, 'assets/images/ui/icon_end.png');
        this.load.image(TextureKeys.End_BannerCongrat, 'assets/images/bg/banner_congrat.png');

        // 5. Audio (Phaser)
        this.load.audio(AudioKeys.BgmNen, 'assets/audio/sfx/nhac_nen.mp3');

        // Scene 1 Assets
        this.load.image(TextureKeys.S1_Banner, 'assets/images/S1/banner_s1.png');
        this.load.image(TextureKeys.S1_BannerText, 'assets/images/S1/banner_text_s1.png');
        this.load.image(TextureKeys.S1_Board, 'assets/images/bg/board_scene_1.png');

        // - Các bộ phận nhân vật/chữ Scene 1
        this.load.image(TextureKeys.S1_Hama_Template, 'assets/images/S1/hama_template.png');
        this.load.image(TextureKeys.S1_Hama_Frame, 'assets/images/S1/frame.png');
        this.load.image(TextureKeys.S1_Hama_Name, 'assets/images/S1/hama_name.png');
        this.load.image(TextureKeys.S1_Hama_Name_Bg, 'assets/images/S1/hama_name_bg.png');
        this.load.image(TextureKeys.S1_Hama_Outline, 'assets/images/S1/hama_outline.png');
        this.load.image(TextureKeys.S1_Hama_1, 'assets/images/S1/hama1.png');
        this.load.image(TextureKeys.S1_Hama_2, 'assets/images/S1/hama2.png');

        // Bảng màu Scene 1
        this.load.image(TextureKeys.BtnViolet, 'assets/images/color/violet.png');
        this.load.image(TextureKeys.BtnLavender, 'assets/images/color/lavender.png');
        this.load.image(TextureKeys.BtnBrown, 'assets/images/color/brown.png');
        this.load.image(TextureKeys.BtnBlue, 'assets/images/color/blue.png');
        this.load.image(TextureKeys.BtnPink, 'assets/images/color/pink.png');
        this.load.image(TextureKeys.BtnCream, 'assets/images/color/cream.png');
        this.load.image(TextureKeys.BtnBlack, 'assets/images/color/black.png');

        // - Config JSON
        this.load.json(DataKeys.LevelS1Config, 'assets/data/level_s1_config.json');
    }

    create() {
        // Tải xong thì chuyển sang PreloadScene1 
        this.scene.start(SceneKeys.Scene1);
    }
}