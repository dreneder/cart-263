class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    
    // Function to create game objects
    create ()
    {  

    this.tunnel = this.physics.add.group({
        // collideWorldBounds: true
    });
        
    this.frameRate = 18;
        let scale = 1.433;
        for (let i = 0; i < 15; i++) {
            scale *= 0.75;
            this.tunnelSegment = this.physics.add.sprite(512,384,`tunnel`).setScale(scale);
            this.anims.create({
                key: 'tunnel',
                frames: this.anims.generateFrameNumbers(`tunnel`),
                frameRate: this.frameRate,
                repeat: -1 // Repeat indefinitely
            });
            this.tunnel.add(this.tunnelSegment);
            this.tunnelSegment.play('tunnel');
        }
            
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update () {
        // if (this.cursors.up.isDown) {
        //     // Increase frame rate gradually
        //     this.frameRate += 1;
        //     // Set new frame rate for the animation
        //     // this.tunnel.anims.setTimeScale(this.frameRate);
        // }
        // else if (this.cursors.up.isDown) {
        //     this.frameRate -= 1;
        //     // Set new frame rate for the animation
        //     // this.tunnel.anims.setTimeScale(this.frameRate);
        // }
        // if (this.cursors.right.isDown) {
        //     this.tunnel.setVelocityX(100);
        // }
        // else if (this.cursors.left.isDown) {
        //     this.tunnel.setVelocityX(-100);
        // }
        // else {
        //     this.tunnel.setVelocityX(0);
        // }
        console.log(this.frameRate);
    }
}

