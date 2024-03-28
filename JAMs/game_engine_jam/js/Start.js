class Start extends Phaser.Scene {
    constructor() {
        super({ key: 'start' });
    }

    create() {
        // Add text
        this.add.text(400, 300, 'Press SPACE to start', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' }).setOrigin(0.5);

        // Add spacebar input
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('play');
        });
    }
}
