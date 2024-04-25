class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load assets here!
        this.load.image('cockpit', 'assets/images/train.png');
        this.load.image('stop', 'assets/images/stop.png');
        this.load.image('lever', 'assets/images/lever.png');
        this.load.spritesheet(`pointer`, 'assets/images/pointer.png', { frameWidth: 1200, frameHeight: 1000 });
        this.load.spritesheet(`direction`, 'assets/images/direction.png', { frameWidth: 1200, frameHeight: 1000 });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}