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

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}