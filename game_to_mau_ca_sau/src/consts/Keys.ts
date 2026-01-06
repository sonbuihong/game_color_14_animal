// src/consts/Keys.ts

// 1. Tên các Màn chơi (Scene)
export enum SceneKeys {
    Preload = 'PreloadScene',
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

    // --- Scene 1 (New Crocodile) ---
    S1_Banner = 'banner_s2',
    S1_BannerText = 'text_banner_s2',
    S1_Board = 'board_s2',
    
    // Tô màu Cá Sấu (Mapped to Scene 1 logic)
    S1_Casau_Template = 'ca_sau_template',
    S1_Casau_Frame = 'ca_sau_frame',
    
    S1_Casau_Name = 'ca_sau_name',
    S1_Casau_Name_Bg = 'ca_sau_name_bg',
    S1_Casau_Outline = 'ca_sau_outline',
    S1_Casau_1 = 'ca_sau_1',
    S1_Casau_2 = 'ca_sau_2',
    S1_Casau_3 = 'ca_sau_3',
    S1_Casau_4 = 'ca_sau_4',

    // Các nút màu Scene 1 (Formerly S2 Colors)
    BtnS2Green1 = 's2_btn_green1',
    BtnS2Green2 = 's2_btn_green2',
    BtnS2Green4 = 's2_btn_green4',
    BtnS2White = 's2_btn_white',
    BtnS2Cream = 's2_btn_cream',

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