class End extends Phaser.Scene {
    constructor() {
        super({ key: 'end' });
    }

    create() {
        if (winGame) {
            this.add.text(600, 300, 'SPACE INVADED', { fontFamily: 'Courier', fontStyle: `bold`, fontSize: 100, color: '#ffffff' }).setOrigin(0.5);
            this.add.text(600, 500, 'you got past the ship\nand invaded all space', { fontFamily: 'Courier', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        }
        else if (loseGame) {
            this.add.text(600, 300, 'DESTROYED', { fontFamily: 'Courier', fontStyle: `bold`, fontSize: 100, color: '#ffffff' }).setOrigin(0.5);
            this.add.text(600, 500, 'your squadron was obliterated', { fontFamily: 'Courier', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        }
        
        
        this.add.text(600, 800, 'Press SPACE to play again', { fontFamily: 'Courier', fontSize: 40, color: '#ffffff' }).setOrigin(0.5);
        this.add.text(502, 800, ' SPACE ', { fontFamily: 'Courier', fontSize: 40, color: '#000000', backgroundColor: '#ffffff' }).setOrigin(0.5);

        // Add spacebar input
        this.input.keyboard.on('keydown-SPACE', () => {
            location.reload(); // Refreshes the page
        });
    }
}