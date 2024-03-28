class End extends Phaser.Scene {
    constructor() {
        super({ key: 'end' });
    }

    create() {
        // Add text
        this.add.text(400, 300, 'You got destroyed\nPress SPACE to try again', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff', align: 'center' }).setOrigin(0.5);

        // Add spacebar input
        this.input.keyboard.on('keydown-SPACE', () => {
            location.reload(); // Refreshes the page
        });
    }
}