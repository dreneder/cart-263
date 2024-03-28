class Start extends Phaser.Scene {
    constructor() {
        super({ key: 'start' });
    }

    create() {

        this.add.text(600, 200, 'INVADE SPACERS', { fontFamily: 'Courier', fontStyle: `bold`, fontSize: 100, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 300, 'get past the defending ship to win', { fontFamily: 'Courier', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 540, 'CONTROLS', { fontFamily: 'Courier', fontSize: 55, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 590, 'shoot', { fontFamily: 'Courier', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 640, ' 1  2  3  4  5  6  7  8  9  0 ', { fontFamily: 'Courier', fontSize: 50,  color: '#000000', backgroundColor: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 640, ' |  |  |  |  |  |  |  |  | ', { fontFamily: 'Courier', fontSize: 50,  color: '#000000'}).setOrigin(0.5);
        this.add.text(600, 700, 'move', { fontFamily: 'Courier', fontSize: 30, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 750, ' ← | → ', { fontFamily: 'Courier', fontSize: 50,  color: '#000000', backgroundColor: '#ffffff' }).setOrigin(0.5);
        this.add.text(600, 900, 'Press SPACE to start', { fontFamily: 'Courier', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(562, 900, ' SPACE ', { fontFamily: 'Courier', fontSize: 40, color: '#000000', backgroundColor: '#ffffff' }).setOrigin(0.5);

        // Press spacebar to advance stages
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('play');
        });
    }
}
