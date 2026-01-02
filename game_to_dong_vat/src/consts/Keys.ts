// src/consts/Keys.ts

// 1. Tên các Màn chơi (Scene)
export enum SceneKeys {
    Preload = 'PreloadScene',
    Scene1 = 'Scene1',
    Scene2 = 'Scene2',
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
    
    // --- Scene 1 ---
    S1_Banner = 'banner_s1',
    S1_BannerText = 'banner_text_s1',
    S1_Board = 'board_white',
    S1_BoardBottom = 'board_bottom',
    S1_TextResult = 'text_result_s1',

    // --- Scene 2 (Tô Màu) ---
    S2_Banner = 'banner_s2',
    S2_TextBanner = 'text_banner_s2',
    S2_Board = 'board_s2',
    
    // Các bộ phận tô màu
    S1_Hama_Template = 'hama_template',
    S1_Hama_Frame = 'hama_frame',

    // Tô màu Hà Mã
    S1_Name = 'hama_name',
    S1_Hama_Outline = 'hama_outline',
    S1_Hama_1 = 'hama1',
    S1_Hama_2 = 'hama2',
    S1_Hama_3 = 'hama3',
    S1_Hama_4 = 'hama4',
    S1_Hama_5 = 'hama5',

    // Tô màu Cá Sấu
    S2_CaSau_Template = 'ca_sau_template',
    S2_CaSau_Frame = 'ca_sau_frame',
    S2_CaSau_Name = 'ca_sau_name',
    S2_CaSau_Outline = 'ca_sau_outline',
    S2_CaSau_1 = 'ca_sau_1',
    S2_CaSau_2 = 'ca_sau_2',
    S2_CaSau_3 = 'ca_sau_3',
    S2_CaSau_4 = 'ca_sau_4',

    // Các nút màu Scene 1
    BtnViolet = 'btn_violet',
    BtnLavender = 'btn_lavender',
    BtnBrown = 'btn_brown',
    BtnBlue = 'btn_blue',
    BtnPink = 'btn_pink',
    BtnCream = 'btn_cream',
    BtnBlack = 'btn_black',

    // Các nút màu Scene 2
    S2_BtnWhite = 's2_btn_white',
    S2_BtnCream = 's2_btn_cream',
    S2_BtnBlack = 's2_btn_black',
    S2_BtnGreen1 = 's2_btn_green1',
    S2_BtnGreen2 = 's2_btn_green2',
    S2_BtnGreen3 = 's2_btn_green3',
    S2_BtnGreen4 = 's2_btn_green4',

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
    LevelS1Config = 'level_1_config',
    LevelS2Config = 'level_2_config'
}