class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        // Load assets here!
        this.load.image('guide', 'assets/images/dungeon-perspective.jpg');
        this.load.image('stone', 'assets/images/stones.png');
        this.load.spritesheet('tunnel', 'assets/images/tunnel.png', { frameWidth: 1024, frameHeight: 768 });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {

    }

    update() {

    }
}