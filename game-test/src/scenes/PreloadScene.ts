// src/scenes/PreloadScene.ts
import Phaser from 'phaser';
import AudioManager from '../audio/AudioManager';
import { phaser } from '@iruka-edu/mini-game-sdk';
import { sdk } from '../main';

const { AssetManager } = phaser;

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // để trống: ta load trong create()
    }

    create() {
        (async () => {
            sdk.loading( 0 );

            try {
                // ✅ (Optional) ép load lại nếu bạn muốn test rename file cho chắc
                // Nếu bạn không cần thì có thể bỏ đoạn này.
                const imageKeys = [
                    'boy',
                    'turtle',
                    'cat',
                    'dolphin',
                    'dog',
                    'chicken',
                    'cow',
                    'monkey',
                    'question_more',
                    'question_less',
                    'panel_bg',
                    'panel_bg_correct',
                    'panel_bg_wrong',
                ];
                for (const k of imageKeys) {
                    if (this.textures.exists(k)) this.textures.remove(k);
                }
                if (this.cache.json.exists('compareLevels'))
                    this.cache.json.remove('compareLevels');

                const am = new AssetManager(this, {
                    strict: true,
                    preferNetworkProbe: true,
                    debug: true,
                    onProgress: (p: any) => {
                        sdk.loading(p.progress01);
                    },
                });

                // ✅ Bọc loadPack bằng “hard fail” dựa trên loaderror event
                await this.loadWithHardFail(() =>
                    am.loadPack({
                        images: [
                            {
                                key: 'boy',
                                basePath: 'assets/images/characters/boy',
                                exts: ['png'],
                            },

                            {
                                key: 'turtle',
                                basePath: 'assets/images/animals/turtle',
                                exts: ['png'],
                            },
                            {
                                key: 'cat',
                                basePath: 'assets/images/animals/cat',
                                exts: ['png'],
                            },
                            {
                                key: 'dolphin',
                                basePath: 'assets/images/animals/dolphin',
                                exts: ['png'],
                            },
                            {
                                key: 'dog',
                                basePath: 'assets/images/animals/dog',
                                exts: ['png'],
                            },
                            {
                                key: 'chicken',
                                basePath: 'assets/images/animals/chicken',
                                exts: ['png'],
                            },
                            {
                                key: 'cow',
                                basePath: 'assets/images/animals/cow',
                                exts: ['png'],
                            },
                            {
                                key: 'monkey',
                                basePath: 'assets/images/animals/monkey',
                                exts: ['png'],
                            },

                            {
                                key: 'question_more',
                                basePath: 'assets/images/ui/question_more',
                                exts: ['png'],
                            },
                            {
                                key: 'question_less',
                                basePath: 'assets/images/ui/question_less',
                                exts: ['png'],
                            },
                            {
                                key: 'panel_bg',
                                basePath: 'assets/images/ui/panel_bg',
                                exts: ['png'],
                            },
                            {
                                key: 'panel_bg_correct',
                                basePath: 'assets/images/ui/panel_bg_ok',
                                exts: ['png'],
                            },
                            {
                                key: 'panel_bg_wrong',
                                basePath: 'assets/images/ui/panel_bg_wrong',
                                exts: ['png'],
                            },
                        ],
                    })
                );

                // ✅ Load JSON cũng bọc hard fail (vì json fail cũng chỉ là event)
                await this.loadJsonHardFail(
                    'compareLevels',
                    'assets/data/compareLevels.json'
                );

                // ✅ Load audio
                await AudioManager.loadAll();

                sdk.loading( 1 );
                this.scene.start('CompareScene');
            } catch (e) {
                console.error('PreloadScene failed', e);
                sdk.error({
                    code: 'ASSET_LOAD_FAIL',
                    message: 'Strict preload failed',
                    detail: String(e),
                });
            }
        })();
    }

    /**
     * ✅ Cực quan trọng:
     * Loader lỗi là event async. Muốn try/catch bắt được thì phải biến nó thành Promise reject.
     *
     * Phaser docs: file fail sẽ emit event 'loaderror' (alias của FILE_LOAD_ERROR).
     *
     */
    private async loadWithHardFail(run: () => Promise<void>): Promise<void> {
        const loader = this.load;

        return await new Promise<void>((resolve, reject) => {
            let settled = false;

            const cleanup = () => {
                loader.off('loaderror', onLoadError);
            };

            const fail = (err: unknown) => {
                if (settled) return;
                settled = true;
                cleanup();
                reject(err);
            };

            const succeed = () => {
                if (settled) return;
                settled = true;
                cleanup();
                resolve();
            };

            const onLoadError = (file: any) => {
                // ✅ Chỉ cần 1 file fail là reject ngay -> catch sẽ chạy
                const key = file?.key || 'unknown';
                const url = file?.src || file?.url || '';
                fail(new Error(`PHASER_LOAD_ERROR: key=${key} url=${url}`));
            };

            loader.on('loaderror', onLoadError);

            run().then(succeed).catch(fail);
        });
    }

    private async loadJsonHardFail(key: string, path: string): Promise<void> {
        const loader = this.load;

        await this.loadWithHardFail(() => {
            return new Promise<void>((resolve) => {
                loader.once(Phaser.Loader.Events.COMPLETE, () => resolve());
                loader.json(key, path);
                loader.start();
            });
        });

        // guard: json phải vào cache
        if (!this.cache.json.exists(key)) {
            throw new Error(`JSON_LOAD_FAIL: ${key} not in cache after load`);
        }
    }
}
