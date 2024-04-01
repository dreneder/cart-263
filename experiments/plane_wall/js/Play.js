class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    
    // Function to create game objects
    create ()
    {
        for (let i = 0; i < 12; i++) {
       this.tunnel = this.add.sprite(512,384,`tunnel`).setScale(1-i*0.25);
        }
        this.tunnelAnimation = this.anims.create({
            key: 'tunnel',
            frames: this.anims.generateFrameNumbers(`tunnel`),
            frameRate: 12
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update () {
       
        
    }
}

