import Phaser from 'phaser';
import { SceneKeys, TextureKeys, DataKeys } from '../consts/Keys';

export default class PreloadScene1 extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preload1);
    }

    preload() {
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
        // Tải xong thì chuyển sang Scene 1
        this.scene.start(SceneKeys.Scene1);
    }
}
