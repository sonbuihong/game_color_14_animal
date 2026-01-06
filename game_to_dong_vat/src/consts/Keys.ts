// src/consts/Keys.ts

// 1. Tên các Màn chơi (Scene)
export enum SceneKeys {
    Preload = 'PreloadScene',
    Preload1 = 'PreloadScene1',
    Scene1 = 'Scene1',
    EndGame = 'EndGameScene',
    UI = 'UIScene'
}

// 2. Tên các Hình ảnh (Texture)
export enum TextureKeys {
    // --- UI Dùng Chung ---
    BtnExit = 'btn_exit',
    BtnReset = 'btn_reset',
    BtnEraser = 'btn_eraser',
    HandHint = 'hand_hint',
    BoardRight = 'board_right',

    // --- Scene 1 ---
    S1_Banner = 'banner_s1',
    S1_BannerText = 'banner_text_s1',
    S1_Board = 'board_white',
    S1_TextResult = 'text_result_s1',


    
    // Các bộ phận tô màu
    S1_Hama_Template = 'hama_template',
    S1_Hama_Frame = 'hama_frame',

    // Tô màu Hà Mã
    S1_Hama_Name = 'hama_name',
    S1_Hama_Name_Bg = 'hama_name_bg',
    S1_Hama_Outline = 'hama_outline',
    S1_Hama_1 = 'hama1',
    S1_Hama_2 = 'hama2',
    S1_Hama_3 = 'hama3',
    S1_Hama_4 = 'hama4',



    // Các nút màu Scene 1
    BtnViolet = 'btn_violet',
    BtnLavender = 'btn_lavender',
    BtnBrown = 'btn_brown',
    BtnBlue = 'btn_blue',
    BtnPink = 'btn_pink',
    BtnCream = 'btn_cream',
    BtnBlack = 'btn_black',



    // --- End Game ---
    End_Icon = 'icon_end',
    End_BannerCongrat = 'banner_congrat'
}

// 3. Tên Âm thanh (Audio)
export enum AudioKeys {
    BgmNen = 'bgm-nen'
}

// 4. Tên File Data (JSON)
export enum DataKeys {
    LevelS1Config = 'level_1_config'
}