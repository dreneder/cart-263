class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load assets here!
        this.load.image(`avatar`, `assets/images/avatar.png`);
        this.load.image(`invader`, `assets/images/invader.png`);
        this.load.image(`bullet`, `assets/images/bullet.png`);
        this.load.image(`bullet2`, `assets/images/bullet2.png`);
        this.load.image(`star`, 'assets/images/star4.png');
        this.load.spritesheet('invaderr', 'assets/images/invaderr.png', { frameWidth: 50, frameHeight: 36 });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}