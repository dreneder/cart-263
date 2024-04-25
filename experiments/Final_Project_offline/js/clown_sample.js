class Example extends Phaser.Scene
{


    create ()
    {
        this.add.image(400, 300, 'sky');

        // Balls in the default world bounds

        const balls = this.physics.add.group({
            key: 'ball',
            frame: [ 0, 1, 2, 3, 4 ],
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: 100,
            velocityY: 100
        });

        Phaser.Actions.RandomRectangle(balls.getChildren(), this.physics.world.bounds);

        this.monitor = this.add.image(400, 300, 'monitor');

        this.boundary = new Phaser.Geom.Rectangle(254, 186, 292, 210)

        // Clown in smaller bounds

        const clown = this.physics.add.image(400, 300, 'clown')
            .setCollideWorldBounds(true, 1, 1)
            .setVelocity(100, -100);

        clown.body.setBoundsRectangle(this.boundary);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
    if (this.cursors.up.isDown) {
        this.boundary.y -= 5;
        this.monitor.y -= 5;
        }
    else if (this.cursors.down.isDown) {
        this.boundary.y += 5;
        this.monitor.y += 5;
        }
    if (this.cursors.left.isDown) {
        this.boundary.x -= 5;
        this.monitor.x -= 5;
        }
    else if (this.cursors.right.isDown) {
        this.boundary.x += 5;
        this.monitor.x += 5;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 200 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);

this.physics.world.on('worldbounds', (body, up, down, left, right) =>
{
    const { gameObject } = body;
    
    if (up) { gameObject.setAngle(90); }
    else if (down) { gameObject.setAngle(-90); }
    else if (left) { gameObject.setAngle(0); }
    else if (right) { gameObject.setAngle(180); }
});