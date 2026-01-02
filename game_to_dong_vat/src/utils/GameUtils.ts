// src/utils/GameUtils.ts
import Phaser from 'phaser';

export class GameUtils {
    /**
     * Lấy chiều rộng màn hình game
     */
    static getW(scene: Phaser.Scene): number {
        return scene.scale.width;
    }

    /**
     * Lấy chiều cao màn hình game
     */
    static getH(scene: Phaser.Scene): number {
        return scene.scale.height;
    }

    /**
     * Lấy tọa độ X theo phần trăm (0.0 -> 1.0)
     * Ví dụ: pctX(this, 0.5) => Giữa màn hình theo chiều ngang
     */
    static pctX(scene: Phaser.Scene, percent: number): number {
        return scene.scale.width * percent;
    }

    /**
     * Lấy tọa độ Y theo phần trăm (0.0 -> 1.0)
     * Ví dụ: pctY(this, 0.1) => Cách mép trên 10%
     */
    static pctY(scene: Phaser.Scene, percent: number): number {
        return scene.scale.height * percent;
    }

    static centerObj(scene: Phaser.Scene, object: Phaser.GameObjects.Image | Phaser.GameObjects.Text) {
        object.setPosition(scene.scale.width / 2, scene.scale.height / 2);
    }

    /**
     * Tính toán trọng tâm (Centroid) của vùng ảnh không trong suốt.
     * Trả về offset (dx, dy) tính từ tâm hình ảnh (Center) đến trọng tâm thực tế.
     * @param scene Context scene để truy cập TextureManager
     * @param textureKey Key của texture cần tính
     * @returns {x: number, y: number} Offset từ tâm
     */
    static calculateCenteredOffset(scene: Phaser.Scene, textureKey: string): { x: number, y: number } {
        const texture = scene.textures.get(textureKey);
        const sourceImage = texture.getSourceImage();

        if (sourceImage instanceof HTMLImageElement || sourceImage instanceof HTMLCanvasElement) {
            const w = sourceImage.width;
            const h = sourceImage.height;

            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (!ctx) return { x: 0, y: 0 };

            ctx.drawImage(sourceImage as CanvasImageSource, 0, 0);
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;

            let sumX = 0;
            let sumY = 0;
            let pixelCount = 0;

            for (let y = 0; y < h; y += 4) { // Tối ưu: Bước nhảy 4 là đủ tốt
                for (let x = 0; x < w; x += 4) {
                    const index = (y * w + x) * 4;
                    const alpha = data[index + 3];
                    
                    if (alpha > 20) { // Ngưỡng alpha để bỏ qua viền quá mờ
                        sumX += x;
                        sumY += y;
                        pixelCount++;
                    }
                }
            }

            if (pixelCount === 0) return { x: 0, y: 0 };

            const centroidX = sumX / pixelCount;
            const centroidY = sumY / pixelCount;

            // Tính offset so với tâm của ảnh (width/2, height/2)
            // Vì Game Object thường có Origin là (0.5, 0.5)
            const offsetX = centroidX - (w / 2);
            const offsetY = centroidY - (h / 2);

            return { x: offsetX, y: offsetY };
        }

        return { x: 0, y: 0 };
    }
}