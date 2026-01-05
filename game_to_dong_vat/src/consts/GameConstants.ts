import { TextureKeys } from './Keys';

/**
 * Chứa toàn bộ hằng số cấu hình của Game.
 * Tập trung tại một chỗ để dễ dàng cân chỉnh (Balancing) mà không cần sửa Logic.
 */
export const GameConstants = {
    // =========================================
    // CẤU HÌNH CHUNG (SYSTEM)
    // =========================================
    PALETTE_DATA: [
        { key: TextureKeys.BtnViolet, color: 0xB38AA0 },
        { key: TextureKeys.BtnLavender, color: 0xD7AECA },
        { key: TextureKeys.BtnBrown, color: 0x86707D },
        { key: TextureKeys.BtnPink, color: 0xEE9B98 },
        // { key: TextureKeys.BtnBlue, color: 0x2F59FF },
        { key: TextureKeys.BtnCream, color: 0xFAE3BA },
        // { key: TextureKeys.BtnBlack, color: 0x000000 },
    ],
    PALETTE_DATA_S2: [
        { key: TextureKeys.S2_BtnGreen1, color: 0x5EA455 },// PaleGreen
        { key: TextureKeys.S2_BtnGreen2, color: 0xB2CB4B }, // LimeGreen
        // { key: TextureKeys.S2_BtnGreen3, color: 0x228B22 }, // ForestGreen
        { key: TextureKeys.S2_BtnWhite, color: 0xFFFFFF },
        { key: TextureKeys.S2_BtnGreen4, color: 0x387440 }, // DarkGreen
        { key: TextureKeys.S2_BtnCream, color: 0xFDFCDC },
        // { key: TextureKeys.S2_BtnBlack, color: 0x000000 },      
    ],
    DEBUG_MODE: true, // Set false khi release
    IDLE: {
        /** Thời gian chờ trước khi hiện gợi ý (ms). 10000 = 10 giây */
        THRESHOLD: 10000,
        /** Thời gian hiệu ứng hiện bàn tay (ms) */
        FADE_IN: 800,
        /** Thời gian hiệu ứng ấn xuống (Scale nhỏ lại) (ms) */
        SCALE: 300,
        /** Thời gian hiệu ứng ẩn bàn tay đi (ms) */
        FADE_OUT: 500,
        /** Bàn tay lệch trục X so với vật thể (px) */
        OFFSET_X: 50,
        /** Bàn tay lệch trục Y so với vật thể (px) */
        OFFSET_Y: 50,
    },

    // =========================================
    // SCENE 1: CÂU ĐỐ CÁI Ô
    // =========================================
    // SCENE1: {
    //     UI: {
    //         /** Vị trí Y của Banner (Tỉ lệ 0.0 - 1.0 so với chiều cao màn hình) */
    //         BANNER_Y: 0.01,
    //         /** Khoảng cách từ đáy Banner xuống đỉnh Bảng (Tỉ lệ màn hình) */
    //         BOARD_OFFSET: 0.03,
    //         /** Khoảng cách lề trái/phải của 2 bảng (Tỉ lệ màn hình) */
    //         BOARD_MARGIN_X: 0.01,
    //         /** Vị trí Mưa: Nằm ở 45% chiều cao của cái Bảng */
    //         ILLUSTRATION_OFFSET: 0.45,
    //         /** Vị trí Thơ: Cách đáy Mưa 17% màn hình */
    //         POEM_OFFSET: 0.17,
            
    //         /** Icon O lệch trái 13% chiều rộng bảng */
    //         ICON_O_X: 0.13,
    //         /** Icon O lệch xuống 6% chiều cao màn hình */
    //         ICON_O_Y: 0.06,
            
    //         /** Item lệch trục X so với tâm bảng (Tỉ lệ chiều rộng bảng) */
    //         ITEM_OFFSET_X_1: 0.17, // Tăng -> trái
    //         ITEM_OFFSET_X_2: 0.17, // Tắng -> trái
    //         ITEM_OFFSET_X_3: 0.2,  // Tăng -> Phải
    //         /** Item lệch trục Y so với tâm bảng (Tỉ lệ chiều rộng bảng) */
    //         ITEM_OFFSET_Y_1: 0.35,
    //         ITEM_OFFSET_Y_2: 0.35,
    //         ITEM_OFFSET_Y_3: -0.15,
    //     },
    //     ANIM: {
    //         /** Thời gian vật nhấp nhô (Floating) (ms) */
    //         FLOAT: 1500,
    //         /** Thời gian bài thơ nhấp nhô (ms) */
    //         POEM_FLOAT: 1200,
    //         /** Thời gian icon lắc lư (ms) */
    //         ICON_SHAKE: 400,
    //         /** Thời gian rung lắc khi chọn Sai (ms) */
    //         WRONG_SHAKE: 80,
    //         /** Thời gian hiện Popup thắng (ms) */
    //         WIN_POPUP: 600,
    //     },
    //     TIMING: {
    //         /** Delay sau khi đọc xong câu đố mới bắt đầu tính Idle (ms) */
    //         DELAY_IDLE: 1000,
    //         /** Delay chuyển sang Scene 2 (ms) */
    //         DELAY_NEXT: 1000,
    //         /** Chờ đọc xong voice "Cái ô" mới phát SFX vỗ tay (ms) */
    //         DELAY_CORRECT_SFX: 1500,
    //     }
    // },

    // =========================================
    // SCENE 2: TÔ MÀU
    // =========================================
    SCENE2: {
        UI: {
            BANNER_Y: 0.001,
            // BẢNG
            BOARD_OFFSET: 0.03,
            // /** Vị trí Y của bảng màu (Tỉ lệ màn hình) */
            // PALETTE_X: 1,
            // PALETTE_Y: 0.89,
            // /** Khoảng cách giữa các nút màu (Tỉ lệ màn hình) */
            // PALETTE_SPACING: 0.07,
            /** Vị trí X của cột màu (Tỉ lệ màn hình) - Bên phải */
            PALETTE_X: 0.93, //0.87
            /** Vị trí Y bắt đầu của nút màu đầu tiên (Tỉ lệ màn hình) */
            PALETTE_START_Y: 0.25, // Bắt đầu từ trên xuống
            /** Khoảng cách dọc giữa các nút màu (Tỉ lệ màn hình) */
            PALETTE_SPACING_Y: 0.13,
            
            // Tọa độ đích cho bàn tay hướng dẫn Intro
            HAND_INTRO_END_X: 0.42,
            HAND_INTRO_END_Y: 0.4,
        },
        TIMING: {
            /** Chờ bao lâu mới bắt đầu Intro (ms) */
            INTRO_DELAY: 1000,
            /** Delay restart intro khi xoay màn hình (ms) */
            RESTART_INTRO: 200,
            /** Thắng xong chờ bao lâu chuyển màn EndGame (ms) */
            WIN_DELAY: 2500,
            /** Thời gian nhấp nháy khi tô xong 1 phần (ms) */
            AUTO_FILL: 100,
        },
        INTRO_HAND: {
            MOVE: 600,
            TAP: 200,
            DRAG: 800,
            RUB: 400,
        }
    },

    // =========================================
    // CẤU HÌNH VẼ (PAINT MANAGER)
    // =========================================
    PAINT: {
        BRUSH_SIZE: 100,
        /** Tỉ lệ tô màu để tính là hoàn thành (0.90 = 90%) */
        WIN_PERCENT: 0.90,
        DEFAULT_COLOR: 0xB38AA0
    },

    // =========================================
    // END GAME SCENE
    // =========================================
    ENDGAME: {
        UI: {
            /** Banner cách tâm giữa lên trên (Tỉ lệ) */
            BANNER_OFFSET: 0.12,
            /** Icon cách tâm giữa lên trên (px) */
            ICON_OFFSET: 150,
            /** Nút bấm cách tâm giữa xuống dưới (Tỉ lệ) */
            BTN_OFFSET: 0.2,
            /** Khoảng cách giữa 2 nút (px) */
            BTN_SPACING: 250,
        },
        CONFETTI: {
            DELAY: 100,
            MIN_DUR: 3000,
            MAX_DUR: 5000,
        },
        ANIM: {
            ICON_FLOAT: 800,
            ICON_SHAKE: 600,
            FIREWORKS_DELAY: 2000,
        }
    }
} as const; // <--- QUAN TRỌNG: Biến toàn bộ object thành Read-only literals