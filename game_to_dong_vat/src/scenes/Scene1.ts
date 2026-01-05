import Phaser from 'phaser';

import { SceneKeys, TextureKeys, DataKeys, AudioKeys } from '../consts/Keys';
import { GameConstants } from '../consts/GameConstants';
import { GameUtils } from '../utils/GameUtils';
import { IdleManager } from '../utils/IdleManager';

import { changeBackground } from '../utils/BackgroundManager';
import { PaintManager } from '../utils/PaintManager';

import {
    playVoiceLocked,
    setGameSceneReference,
    resetVoiceState,
} from '../utils/rotateOrientation';
import AudioManager from '../audio/AudioManager';
import { showGameButtons } from '../main';

import FPSCounter from '../utils/FPSCounter';

export default class Scene1 extends Phaser.Scene {
    // Đối tượng âm thanh nền (Background Music)
    private bgm!: Phaser.Sound.BaseSound;

    // --- QUẢN LÝ LOGIC (MANAGERS) ---
    private paintManager!: PaintManager; // Quản lý việc tô màu, cọ vẽ, canvas
    private idleManager!: IdleManager; // Quản lý thời gian rảnh để hiện gợi ý
    private fpsCounter!: FPSCounter;
    // --- QUẢN LÝ TRẠNG THÁI GAME (GAME STATE) ---
    // Map lưu các bộ phận chưa tô xong (Key: ID, Value: Image Object) -> Dùng để random gợi ý
    private unfinishedPartsMap: Map<string, Phaser.GameObjects.Image> =
        new Map();
    // Set lưu ID các bộ phận đã hoàn thành -> Dùng để check thắng (Win condition)
    private finishedParts: Set<string> = new Set();
    private totalParts: number = 0; // Tổng số bộ phận cần tô
    private isIntroActive: boolean = false; // Cờ chặn tương tác khi đang chạy intro

    // --- UI COMPONENTS ---
    private get handHint(): Phaser.GameObjects.Image | undefined {
         const uiScene = this.scene.get(SceneKeys.UI) as any;
         return uiScene?.handHint;
    }

    // Tween đang chạy cho gợi ý (lưu lại để stop khi cần)
    private activeHintTween: Phaser.Tweens.Tween | null = null;
    private activeHintTarget: Phaser.GameObjects.Image | null = null;

    constructor() {
        super(SceneKeys.Scene1);
    }

    /**
     * Khởi tạo lại dữ liệu khi Scene bắt đầu (hoặc Restart)
     * QUAN TRỌNG: Phải clear các Map/Set để tránh lỗi "Zombie Object" (tham chiếu đến object cũ đã bị destroy)
     */
    init() {
        this.unfinishedPartsMap.clear();
        this.finishedParts.clear();
        this.totalParts = 0;
    }

    create() {
        document.title = "Game Tô Màu Con Hà Mã";
        showGameButtons();
        
        this.setupSystem(); // Cài đặt hệ thống (Paint, Idle)
        this.setupBackgroundAndAudio(); // Cài đặt hình nền và nhạc nền
        this.createUI(); // Tạo giao diện (Bảng màu, Banner)
        
        // Chạy UI Scene
        this.scene.launch(SceneKeys.UI, { 
            paintManager: this.paintManager,
            sceneKey: SceneKeys.Scene1 
        });

        this.createLevel(); // Tạo nhân vật và các vùng tô màu

        this.setupInput(); // Cài đặt sự kiện chạm/vuốt

        this.playIntroSequence(); // Chạy hướng dẫn đầu game

        // Sự kiện khi quay lại tab game (Wake up)
        this.events.on('wake', () => {
            this.idleManager.reset();
            if (this.input.keyboard) this.input.keyboard.enabled = true;
        });

        // ✅ HIỂN THỊ FPS
        // this.fpsCounter = new FPSCounter(this);
    }

    update(time: number, delta: number) {
        // Chỉ đếm thời gian Idle khi:
        // 1. Không đang tô màu
        // 2. Không đang chạy Intro
        // 3. Chưa thắng game
        if (
            !this.paintManager.isPainting() &&
            !this.isIntroActive &&
            this.finishedParts.size < this.totalParts
        ) {
            this.idleManager.update(delta);
        }

        // Cập nhật FPS
        if (this.fpsCounter) {
            this.fpsCounter.update();
        }
    }

    shutdown() {
        this.stopIntro();

        this.paintManager = null as any; // Giải phóng bộ nhớ
        this.scene.stop(SceneKeys.UI);
    }

    // =================================================================
    // PHẦN 1: CÀI ĐẶT HỆ THỐNG (SYSTEM SETUP)
    // =================================================================

    private setupSystem() {
        resetVoiceState();
        (window as any).gameScene = this;
        setGameSceneReference(this);

        // Khởi tạo PaintManager
        // Callback nhận về: id, renderTexture, và DANH SÁCH MÀU ĐÃ DÙNG (Set<number>)
        this.paintManager = new PaintManager(this, (id, rt, usedColors) => {
            this.handlePartComplete(id, rt, usedColors);
        });



        // Cài đặt Idle Manager: Khi rảnh quá lâu thì gọi showHint()
        this.idleManager = new IdleManager(GameConstants.IDLE.THRESHOLD, () =>
            this.showHint()
        );
    }

    private setupInput() {
        // Chuyển tiếp các sự kiện input sang cho PaintManager xử lý vẽ
        this.input.on('pointermove', (p: Phaser.Input.Pointer) =>
            this.paintManager.handlePointerMove(p)
        );
        this.input.on('pointerup', () => this.paintManager.handlePointerUp());

        // Khi chạm vào màn hình -> Reset bộ đếm Idle
        this.input.on('pointerdown', () => {
            this.idleManager.reset();
            this.stopIntro();
            this.stopActiveHint();
        });
    }

    /**
     * Cài đặt hình nền và nhạc nền
     */
    private setupBackgroundAndAudio() {
        changeBackground('assets/images/bg/background_game.jpg');

        // Dừng nhạc nền cũ nếu có (tránh chồng nhạc)
        if (this.sound.get(AudioKeys.BgmNen)) {
            this.sound.stopByKey(AudioKeys.BgmNen);
        }
        // Khởi tạo và phát nhạc nền mới
        this.bgm = this.sound.add(AudioKeys.BgmNen, {
            loop: true,
            volume: 1,
        });
        this.bgm.play();
    }
    // =================================================================
    // PHẦN 2: TẠO GIAO DIỆN & LEVEL (UI & LEVEL CREATION)
    // =================================================================

    private createUI() {
        const UI = GameConstants.SCENE2.UI;
        const cx = GameUtils.pctX(this, 0.5);

        // Tính toán vị trí Board dựa trên Banner
        // const bannerY = GameUtils.pctY(this, UI.BANNER_Y);
        const bannerHeight = this.textures.get(TextureKeys.S1_Banner).getSourceImage().height * 0.7; // Scale 0.7

        const boardY = bannerHeight + GameUtils.pctY(this, UI.BOARD_OFFSET);
        const board = this.add
            .image(cx, boardY, TextureKeys.S1_Board)
            .setOrigin(0.5, 0)
            .setScale(1, 0.72)
            .setDepth(0);

        const boardRightX = board.x + board.displayWidth / 2;
        const boardCenterY = board.y + board.displayHeight / 2;
        const rightBoard = this.add
            .image(boardRightX - 8, boardCenterY, TextureKeys.BoardRight)
            .setOrigin(1, 0.5)
            .setScale(1, 0.72)
            .setDepth(10);
        // Lấy scene chung và ép kiểu sang UIScene để truy cập các thuộc tính public
        // Chúng ta sẽ xóa việc tạo cục bộ ở đây.
    }

// --- LOGIC TẠO LEVEL THEO STAGE ---
    private createLevel() {
        // Load cấu hình level từ JSON
        const data = this.cache.json.get(DataKeys.LevelS1Config);
        if (data) {
            this.spawnCharacter(data.teacher);
            this.createDecorativeLetter(data.letter);
            this.createDecorativeObject(data.name);
        }
    }

    private createDecorativeLetter(config: any) {
        const cx = GameUtils.pctX(this, config.baseX_pct);
        const cy = GameUtils.pctY(this, config.baseY_pct);
        
        // Vẽ Frame (Khung) nếu có
        if (config.frameKey) {
            // Vẽ frame ở dưới (depth thấp hơn outline)
            const frame = this.add.image(cx, cy, config.frameKey)
                .setOrigin(0.2, 0.5)
                .setScale(config.baseScale)
                .setDepth(5);
        }

        // Chỉ hiện outline
        const outline = this.add.image(cx, cy, config.outlineKey)
            .setOrigin(0.1, 0.5)
            .setScale(config.baseScale).setDepth(100);
    }

    private createDecorativeObject(config: any) {
        if (!config) return;
        const cx = GameUtils.pctX(this, config.baseX_pct);
        const cy = GameUtils.pctY(this, config.baseY_pct);
        
        // Vẽ Frame (Khung) nếu có
        if (config.frameKey && config.frameKey !== "") {
            this.add.image(cx, cy, config.frameKey)
                .setOrigin(0.5)
                .setScale(config.baseScale)
                .setDepth(5);
        }

        // Chỉ hiện outline (hình ảnh chính)
        if (config.outlineKey) {
            this.add.image(cx, cy, config.outlineKey)
                .setScale(config.baseScale)
                .setDepth(100);
        }
    }

    private spawnCharacter(config: any) {
        const cx = GameUtils.pctX(this, config.baseX_pct);
        const cy = GameUtils.pctY(this, config.baseY_pct);

        config.parts.forEach((part: any, index: number) => {
            const id = `${part.key}_${index}`;
            const layerX = cx + part.offsetX;
            const layerY = cy + part.offsetY;

            // Tạo vùng tô màu thông qua PaintManager
            const hitArea = this.paintManager.createPaintableLayer(
                layerX,
                layerY,
                part.key,
                part.scale,
                id
            );

            // --- BEST PRACTICE: LƯU DỮ LIỆU TĨNH & TÍNH TOÁN TỰ ĐỘNG ---
            // 1. Ưu tiên lấy từ Config nếu có (Manual override)
            // 2. Nếu không có, tự động tính toán trọng tâm (Auto centroid)
            // --- BEST PRACTICE: LUÔN TỰ ĐỘNG TÍNH TOÁN TRỌNG TÂM THÔNG MINH ---
            // Không dùng config cứng nữa, để thuật toán logic mới tự tìm điểm "ngon" nhất
            const centerOffset = GameUtils.calculateCenteredOffset(this, part.key);
            let hX = centerOffset.x;
            let hY = centerOffset.y;

            // Lưu các thông số cấu hình vào Data Manager của Game Object.
            hitArea.setData('hintX', hX);
            hitArea.setData('hintY', hY);
            hitArea.setData('originScale', part.scale); // Scale gốc (không đổi)

            this.unfinishedPartsMap.set(id, hitArea);
            this.totalParts++;
        });

        // Vẽ viền (Outline) lên trên cùng
        const outline = this.add
            .image(cx, cy, config.outlineKey)
            .setScale(config.baseScale)
            .setDepth(900)
            .setInteractive({ pixelPerfect: true });
    }

    // =================================================================
    // PHẦN 3: LOGIC GAMEPLAY (GAMEPLAY LOGIC)
    // =================================================================

    /**
     * Xử lý khi một bộ phận được tô xong
     * @param usedColors Set chứa danh sách các màu đã tô lên bộ phận này
     */
    private handlePartComplete(
        id: string,
        rt: Phaser.GameObjects.RenderTexture,
        usedColors: Set<number>
    ) {
        this.finishedParts.add(id);

        // --- LOGIC AUTO-FILL THÔNG MINH ---
        // Nếu bé chỉ dùng ĐÚNG 1 MÀU -> Game tự động fill màu đó cho đẹp (khen thưởng)
        if (usedColors.size === 1) {
            const singleColor = usedColors.values().next().value || 0;

            rt.setBlendMode(Phaser.BlendModes.NORMAL);
            rt.fill(singleColor);
        } else {
            // Nếu bé dùng >= 2 màu (tô sặc sỡ) -> Giữ nguyên nét vẽ nghệ thuật của bé
            console.log('Multi-color artwork preserved!');
        }

        // Xóa khỏi danh sách chưa tô -> Để gợi ý không chỉ vào cái này nữa
        this.unfinishedPartsMap.delete(id);

        AudioManager.play('sfx-ting');

        // Hiệu ứng nhấp nháy báo hiệu hoàn thành
        this.tweens.add({
            targets: rt,
            alpha: 0.8,
            yoyo: true,
            duration: GameConstants.SCENE2.TIMING.AUTO_FILL,
            repeat: 2,
        });

        // Kiểm tra điều kiện thắng
        if (this.finishedParts.size >= this.totalParts) {
            console.log('WIN!');
            AudioManager.play('sfx-correct_s2');
            
            // Xóa UI (Nút màu)
            const uiScene = this.scene.get(SceneKeys.UI) as any;
            if (uiScene && uiScene.hidePalette) {
                uiScene.hidePalette();
            }

            this.time.delayedCall(GameConstants.SCENE2.TIMING.WIN_DELAY, () =>
                this.scene.start(SceneKeys.EndGame)
            );
        }
        
    }

    // =================================================================
    // PHẦN 4: HƯỚNG DẪN & GỢI Ý (TUTORIAL & HINT)
    // =================================================================

    public restartIntro() {
        this.stopIntro();
        this.time.delayedCall(GameConstants.SCENE2.TIMING.RESTART_INTRO, () =>
            this.playIntroSequence()
        );
    }

    private playIntroSequence() {
        this.isIntroActive = true;
        playVoiceLocked(null, 'voice_intro_s2');
        // Đợi 1 chút rồi chạy animation tay hướng dẫn
        this.time.delayedCall(GameConstants.SCENE2.TIMING.INTRO_DELAY, () => {
            if (this.isIntroActive) this.runHandTutorial();
        });
    }

    private stopIntro() {
        this.isIntroActive = false;
        this.idleManager.start();

        if (this.handHint) {
            this.handHint.setAlpha(0).setPosition(-200, -200);
        }
    }

    /**
     * Tutorial đầu game: Tay cầm màu đỏ tô mẫu
     */
    private runHandTutorial() {
        if (!this.isIntroActive) return;

        // 1. Tìm bộ phận mục tiêu (Lấy bộ phận đầu tiên chưa tô)
        const items = Array.from(this.unfinishedPartsMap.values());
        let target: Phaser.GameObjects.Image | undefined;
        let destX = 0;
        let destY = 0;

        if (items.length > 0) {
            target = items[0]; // Lấy cái đầu tiên
            const hX = target.getData('hintX') || 0;
            const hY = target.getData('hintY') || 0;
            const originScale = target.getData('originScale') || 1;

            // Tính tọa độ đích chính xác
            destX = target.x + (hX * originScale);
            destY = target.y + (hY * originScale);
        } else {
            // Fallback nếu không có part nào (hiếm gặp)
            const UI = GameConstants.SCENE2.UI;
            destX = GameUtils.pctX(this, UI.HAND_INTRO_END_X);
            destY = GameUtils.pctY(this, UI.HAND_INTRO_END_Y);
        }

        // 2. Visual: Nhấp nháy bộ phận đó (nếu có) để gây chú ý
        if (target) {
            this.activeHintTarget = target;
            this.tweens.add({
                targets: target, 
                alpha: { from: 0.01, to: 0.8 },
                scale: { from: target.getData('originScale'), to: target.getData('originScale') * 1.005 },
                duration: GameConstants.IDLE.FADE_IN, 
                yoyo: true, 
                repeat: 2,
                onComplete: () => {
                    if (this.activeHintTarget === target) {
                         this.activeHintTarget = null;
                    }
                }
            });
        }

        const UI = GameConstants.SCENE2.UI;
        const INTRO = GameConstants.SCENE2.INTRO_HAND;

        // Tính toán tọa độ nút màu đầu tiên (Vertical Layout)
        const spacingY = GameUtils.pctX(this, UI.PALETTE_SPACING_Y);
        const startY = GameUtils.pctY(this, UI.PALETTE_START_Y); 
        const paletteX = GameUtils.pctX(this, UI.PALETTE_X);

        const startX = paletteX;
        const dragY = destY + 30; // Kéo tay xuống thấp hơn điểm đích một chút để không che mất

        if (!this.handHint) return;

        this.handHint.setOrigin(0, 0);
        this.handHint.setPosition(startX, startY).setAlpha(0).setScale(0.7);

        // Chuỗi Animation: Hiện -> Ấn chọn màu -> Kéo ra -> Di đi di lại (tô) tại đúng vị trí -> Biến mất
        this.tweens.chain({
            targets: this.handHint,
            tweens: [
                {
                    alpha: 1,
                    x: startX,
                    y: startY,
                    duration: INTRO.MOVE,
                    ease: 'Power2',
                },
                { scale: 0.5, duration: INTRO.TAP, yoyo: true, repeat: 0.7 },
                { x: destX, y: dragY, duration: INTRO.DRAG, delay: 100 },
                {
                    x: '-=30',
                    y: '-=10',
                    duration: INTRO.RUB,
                    yoyo: true,
                    repeat: 3,
                },
                {
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        this.handHint?.setPosition(-200, -200);
                        // Lặp lại nếu Intro chưa kết thúc
                        if (this.isIntroActive)
                            this.time.delayedCall(1000, () =>
                                this.runHandTutorial()
                            );
                    },
                },
            ],
        });
    }

    /**
     * Gợi ý khi rảnh (Idle Hint): Chọn ngẫu nhiên 1 phần chưa tô để chỉ vào
     */
    private showHint() {
        const items = Array.from(this.unfinishedPartsMap.values());
        if (items.length === 0) return;
        
        // Random 1 bộ phận
        const target = items[Math.floor(Math.random() * items.length)];

        AudioManager.play('hint');
        
        const IDLE_CFG = GameConstants.IDLE;

        // Visual 1: Nhấp nháy bộ phận đó
        this.activeHintTarget = target;
        this.activeHintTween = this.tweens.add({
            targets: target, 
            alpha: { from: 0.01, to: 0.8 },
            scale: { from: target.getData('originScale'), to: target.getData('originScale') * 1.005 },
            duration: IDLE_CFG.FADE_IN, 
            yoyo: true, 
            repeat: 2,
            onComplete: () => { 
                this.activeHintTween = null; 
                this.activeHintTarget = null;
                this.idleManager.reset(); 
            }
        });

        // Visual 2: Bàn tay chỉ vào
        // --- FIX BUG LỆCH VỊ TRÍ (BEST PRACTICE) ---
        // Không dùng target.scaleX vì nó biến thiên khi tween.
        // Dùng originScale (lấy từ Data) để đảm bảo tính toán vị trí luôn chính xác tuyệt đối.
        const hX = target.getData('hintX') || 0;
        const hY = target.getData('hintY') || 0;
        const originScale = target.getData('originScale') || 1; 

        // Tính tọa độ đích dựa trên scale gốc
        const destX = target.x + (hX * originScale);
        const destY = target.y + (hY * originScale);

        if (!this.handHint) return;
        
        // --- CẬP NHẬT: SET ORIGIN (0,0) ĐỂ NGÓN TAY (GÓC TRÁI TRÊN) CHỈ ĐÚNG VÀO ĐIỂM ---
        this.handHint.setOrigin(0, 0);

        // Không dùng OFFSET nữa vì muốn chỉ chính xác
        this.handHint.setPosition(destX, destY)
            .setAlpha(0).setScale(0.7);
        
        this.tweens.chain({
            targets: this.handHint,
            tweens: [
                { alpha: 1, x: destX, y: destY, duration: IDLE_CFG.FADE_IN },
                { scale: 0.5, duration: IDLE_CFG.SCALE, yoyo: true, repeat: 3 },
                { alpha: 0, duration: IDLE_CFG.FADE_OUT }
            ]
        });
    }

    private stopActiveHint() {
        if (this.activeHintTween) {
            this.activeHintTween.stop();
            this.activeHintTween = null;
        }

        if (this.activeHintTarget) {
            this.tweens.killTweensOf(this.activeHintTarget);
            this.activeHintTarget.setAlpha(0.01); // Reset about PaintManager default alpha
            this.activeHintTarget.setScale(this.activeHintTarget.getData('originScale'));
            this.activeHintTarget = null;
        }

        if (this.handHint) {
            this.tweens.killTweensOf(this.handHint);
            this.handHint.setAlpha(0).setPosition(-200, -200);
        }
    }
}
