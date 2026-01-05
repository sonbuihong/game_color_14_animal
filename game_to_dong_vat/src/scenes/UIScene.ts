import Phaser from 'phaser';
import { SceneKeys, TextureKeys } from '../consts/Keys';
import { GameConstants } from '../consts/GameConstants';
import { GameUtils } from '../utils/GameUtils';
import { PaintManager } from '../utils/PaintManager';

export default class UIScene extends Phaser.Scene {
    private paintManager!: PaintManager;
    private sceneKey!: string;
    private paletteButtons: Phaser.GameObjects.Image[] = [];
    private firstColorBtn!: Phaser.GameObjects.Image;
    public handHint!: Phaser.GameObjects.Image;
    constructor() {
        super(SceneKeys.UI);
    }

    init(data: { paintManager: PaintManager; sceneKey: string }) {
        this.paintManager = data.paintManager;
        this.sceneKey = data.sceneKey; // Lưu sceneKey để dùng
        this.paletteButtons = [];
    }

    create() {
        this.createUI();
    }

    private createUI() {
        const UI = GameConstants.SCENE2.UI;
        const cx = GameUtils.pctX(this, 0.5);

        // Tính toán vị trí Board dựa trên Banner
        const bannerY = GameUtils.pctY(this, UI.BANNER_Y);
        const bannerHeight = this.textures.get(TextureKeys.S1_Banner).getSourceImage().height * 0.7; // Tỉ lệ 0.7

        // Xác định TextureKeys dựa trên SceneKey
        if(this.sceneKey === SceneKeys.Scene1){
            let bannerKey = TextureKeys.S1_Banner;
            let textBannerKey = TextureKeys.S1_BannerText;
            // Hiển thị Banner và Text
            this.add.image(cx, bannerY, bannerKey).setScale(0.7).setOrigin(0.5, -0.1);
            this.add.image(cx, bannerY, textBannerKey).setScale(0.7).setOrigin(0.5, -1);
        }

        if (this.sceneKey === SceneKeys.Scene2) {
            let bannerKey = TextureKeys.S2_Banner;
            let textBannerKey = TextureKeys.S2_BannerText;
            // Hiển thị Banner và Text
            this.add.image(cx, bannerY, bannerKey).setScale(0.7).setOrigin(0.5, -0.1);
            this.add.image(cx, bannerY, textBannerKey).setScale(0.7).setOrigin(0.5, -1);
        }

        // Lưu ý: Bảng được giữ trong Game Scene vì nó đóng khung khu vực vẽ.

        // Tạo bàn tay gợi ý (ẩn đi, set depth cao nhất để đè lên mọi thứ)
        this.handHint = this.add
            .image(0, 0, TextureKeys.HandHint)
            .setDepth(2000) // Đảm bảo nó nằm trên các phần tử UI khác
            .setAlpha(0)
            .setScale(0.7);
        
        this.createPalette();
    }

    private createPalette() {
        const UI = GameConstants.SCENE2.UI;
        // Chọn bộ màu dựa trên SceneKey
        const paletteData = (this.sceneKey === SceneKeys.Scene2) 
            ? GameConstants.PALETTE_DATA_S2 
            : GameConstants.PALETTE_DATA;

        const spacingY = GameUtils.pctY(this, UI.PALETTE_SPACING_Y);
        const startY = GameUtils.pctY(this, UI.PALETTE_START_Y);
        const paletteX = GameUtils.pctX(this, UI.PALETTE_X);

        paletteData.forEach((item, i) => {
            // Logic 1 cột:
            const btnX = paletteX;
            const btnY = startY + i * spacingY;

            const btn = this.add.image(btnX, btnY, item.key).setInteractive().setDepth(1);

            // Logic visual: Nút đầu tiên to hơn (đang chọn)
            if (i === 0) {
                this.firstColorBtn = btn;
                btn.setScale(0.9).setAlpha(1);
                this.paintManager.setColor(item.color); // ✅ Sync màu cọ với nút đầu tiên
            } else {
                btn.setAlpha(0.8).setScale(0.7);
            }

            btn.on('pointerdown', () => {
                this.updatePaletteVisuals(btn);
                this.paintManager.setColor(item.color); // Đổi màu cọ
            });
            this.paletteButtons.push(btn);
        });

        // Tạo nút Tẩy (Eraser) - Nằm tiếp theo trong cột
        const eraserIndex = paletteData.length;
        
        const eraserX = paletteX;
        const eraserY = startY + eraserIndex * spacingY;

        const eraser = this.add
            .image(eraserX, eraserY, TextureKeys.BtnEraser)
            .setInteractive()
            .setAlpha(0.8)
            .setScale(0.7)
            .setDepth(1);
        eraser.on('pointerdown', () => {
            this.updatePaletteVisuals(eraser);
            this.paintManager.setEraser();
        });
        this.paletteButtons.push(eraser);
    }

    // Cập nhật hiệu ứng to/nhỏ của các nút màu khi được chọn
    private updatePaletteVisuals(activeBtn: Phaser.GameObjects.Image) {
        this.paletteButtons.forEach((b) => b.setScale(0.7).setAlpha(0.8));
        activeBtn.setScale(0.9).setAlpha(1);
    }
}
