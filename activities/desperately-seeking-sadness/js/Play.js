class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        //Create the avatar
        this.avatar = this.physics.add.sprite(400,300,`avatar`);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // if (this.cursors.left.isDown) {
        //     this.ship.setAngularVelocity(-150);
        // }
        // else if (this.cursors.right.isDown) {
        //     this.ship.setAngularVelocity(150);
        // }
        // else {
        //     this.ship.setAngularVelocity(0);
        // }

        // if (this.cursors.up.isDown) {
        //     this.physics.velocityFromRotation(this.ship.rotation, 602000, this.ship.body.acceleration);
        // }
        // else {
        //     this.ship.setAcceleration(0);
        // }
    }
    
}