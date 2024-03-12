class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }
    preload() {
        // Load assets here!
        this.load.image(`avatar`, `assets/images/avatar.png`);

        this.preload.toString(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}