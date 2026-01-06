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
            PALETTE_X: 0.91,
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