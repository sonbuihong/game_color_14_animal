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

        // 2. Scene 1 Assets
        this.load.image(TextureKeys.S1_Banner, 'assets/images/S1/banner_s1.png');

        this.load.image(TextureKeys.S1_Board, 'assets/images/bg/board_scene_1.png');
        this.load.image(TextureKeys.S1_BoardBottom, 'assets/images/bg/bottom_board.png');
        this.load.image(TextureKeys.S1_BannerText, 'assets/images/S1/banner_text_s1.png');

        // 3. Scene 2 Assets (Load in PreloadScene2)
        // this.load.image(TextureKeys.S2_Banner, 'assets/images/S2/banner_s2.png');
        // this.load.image(TextureKeys.S2_TextBanner, 'assets/images/S2/banner_text_ca_sau.png');
        // this.load.image(TextureKeys.S2_Board, 'assets/images/bg/board_scene_2.png');

        // - Các bộ phận nhân vật/chữ Scene 1
        this.load.image(TextureKeys.S1_Hama_Template, 'assets/images/S1/hama_template.png');
        this.load.image(TextureKeys.S1_Hama_Frame, 'assets/images/S1/frame.png');

        // - Con Hà Mã Scene 1
        this.load.image(TextureKeys.S1_Name, 'assets/images/S1/hama_name.png');
        this.load.image(TextureKeys.S1_Hama_Outline, 'assets/images/S1/hama_outline.png');
        this.load.image(TextureKeys.S1_Hama_1, 'assets/images/S1/hama1.png');
        this.load.image(TextureKeys.S1_Hama_2, 'assets/images/S1/hama2.png');
        this.load.image(TextureKeys.S1_Hama_3, 'assets/images/S1/hama3.png');
        this.load.image(TextureKeys.S1_Hama_4, 'assets/images/S1/hama4.png');
        this.load.image(TextureKeys.S1_Hama_5, 'assets/images/S1/hama5.png');

        // - Con Cá Sấu Scene 2 (Moved to PreloadScene2)
        // this.load.image(TextureKeys.S2_CaSau_Template, 'assets/images/S2/ca_sau_template.png');
        // this.load.image(TextureKeys.S2_CaSau_Frame, 'assets/images/S2/frame.png');
        // this.load.image(TextureKeys.S2_CaSau_Name, 'assets/images/S2/ca_sau_name.png');
        // this.load.image(TextureKeys.S2_CaSau_Outline, 'assets/images/S2/ca_sau_outline.png');
        // this.load.image(TextureKeys.S2_CaSau_1, 'assets/images/S2/ca_sau_1.png');
        // this.load.image(TextureKeys.S2_CaSau_2, 'assets/images/S2/ca_sau_2.png');
        // this.load.image(TextureKeys.S2_CaSau_3, 'assets/images/S2/ca_sau_3.png');
        // this.load.image(TextureKeys.S2_CaSau_4, 'assets/images/S2/ca_sau_4.png');

        // Bảng màu Scene 2 (Moved to PreloadScene2)
        // this.load.image(TextureKeys.S2_BtnWhite, 'assets/images/color2/white.png');
        // this.load.image(TextureKeys.S2_BtnCream, 'assets/images/color2/cream.png');
        // this.load.image(TextureKeys.S2_BtnBlack, 'assets/images/color2/black.png');
        // this.load.image(TextureKeys.S2_BtnGreen1, 'assets/images/color2/green1.png');
        // this.load.image(TextureKeys.S2_BtnGreen2, 'assets/images/color2/green2.png');
        // this.load.image(TextureKeys.S2_BtnGreen3, 'assets/images/color2/green3.png');
        // this.load.image(TextureKeys.S2_BtnGreen4, 'assets/images/color2/green4.png');

        // - Nút màu
        this.load.image(TextureKeys.BtnViolet, 'assets/images/color/violet.png');
        this.load.image(TextureKeys.BtnLavender, 'assets/images/color/lavender.png');
        this.load.image(TextureKeys.BtnBrown, 'assets/images/color/brown.png');
        this.load.image(TextureKeys.BtnBlue, 'assets/images/color/blue.png');
        this.load.image(TextureKeys.BtnPink, 'assets/images/color/pink.png');
        this.load.image(TextureKeys.BtnCream, 'assets/images/color/cream.png');
        this.load.image(TextureKeys.BtnBlack, 'assets/images/color/black.png');

        // - Config JSON
        this.load.json(DataKeys.LevelS1Config, 'assets/data/level_s1_config.json');
        // this.load.json(DataKeys.LevelS2Config, 'assets/data/level_s2_config.json');

        // 4. End Game Assets
        this.load.image(TextureKeys.End_Icon, 'assets/images/ui/icon_end.png');
        this.load.image(TextureKeys.End_BannerCongrat, 'assets/images/bg/banner_congrat.png');

        // 5. Audio (Phaser)
        this.load.audio(AudioKeys.BgmNen, 'assets/audio/sfx/nhac_nen.mp3');
    }

    create() {
        // Tải xong thì chuyển sang Scene 1
        this.scene.start(SceneKeys.Scene1);
    }
}