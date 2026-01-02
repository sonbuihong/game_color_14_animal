import Phaser from 'phaser';
import { SceneKeys, TextureKeys, DataKeys } from '../consts/Keys';

export default class PreloadScene2 extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preload2);
    }

    preload() {
        // 3. Scene 2 Assets
        this.load.image(TextureKeys.S2_Banner, 'assets/images/S2/banner_s2.png');
        this.load.image(TextureKeys.S2_TextBanner, 'assets/images/S2/banner_text_ca_sau.png');
        this.load.image(TextureKeys.S2_Board, 'assets/images/bg/board_scene_2.png');

        // - Con Cá Sấu Scene 2
        this.load.image(TextureKeys.S2_CaSau_Template, 'assets/images/S2/ca_sau_template.png');
        this.load.image(TextureKeys.S2_CaSau_Frame, 'assets/images/S2/frame.png');
        this.load.image(TextureKeys.S2_CaSau_Name, 'assets/images/S2/ca_sau_name.png');
        this.load.image(TextureKeys.S2_CaSau_Outline, 'assets/images/S2/ca_sau_outline.png');
        this.load.image(TextureKeys.S2_CaSau_1, 'assets/images/S2/ca_sau_1.png');
        this.load.image(TextureKeys.S2_CaSau_2, 'assets/images/S2/ca_sau_2.png');
        this.load.image(TextureKeys.S2_CaSau_3, 'assets/images/S2/ca_sau_3.png');
        this.load.image(TextureKeys.S2_CaSau_4, 'assets/images/S2/ca_sau_4.png');

        // Bảng màu Scene 2
        this.load.image(TextureKeys.S2_BtnWhite, 'assets/images/color2/white.png');
        this.load.image(TextureKeys.S2_BtnCream, 'assets/images/color2/cream.png');
        this.load.image(TextureKeys.S2_BtnBlack, 'assets/images/color2/black.png');
        this.load.image(TextureKeys.S2_BtnGreen1, 'assets/images/color2/green1.png');
        this.load.image(TextureKeys.S2_BtnGreen2, 'assets/images/color2/green2.png');
        this.load.image(TextureKeys.S2_BtnGreen3, 'assets/images/color2/green3.png');
        this.load.image(TextureKeys.S2_BtnGreen4, 'assets/images/color2/green4.png');

        // - Config JSON for Scene 2
        this.load.json(DataKeys.LevelS2Config, 'assets/data/level_s2_config.json');
    }

    create() {
        // Transfer to Scene 2
        this.scene.start(SceneKeys.Scene2);
    }
}
