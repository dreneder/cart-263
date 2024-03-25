class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        // Create the avatar
        this.avatar = this.physics.add.sprite(600, 100, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setScale(0.1);
        this.avatar.setAngle(180);
        this.avatar.setVelocityX(50);
        this.avatar.setBounceX(1);

        // Create the invader group
        this.invader = this.physics.add.group({
            key: `invader`,
            quantity: 50,
            gridAlign: {
                width: 10,
                cellWidth: 70,
                cellHeight: 50,
                x: 200,
                y: 500
            },
            collideWorldBounds: true
        });
        this.invader.setVelocityY(-100);

        // Create a group for bullets
        this.bullets = this.physics.add.group({
            key: `bullet`
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.numberKeys = this.input.keyboard.addKeys('ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,ZERO');
    }

    createBullet(x, y) {
        // Create bullet sprite at the given position
        const bullet = this.bullets.create(x, y, 'bullet');
        bullet.setVelocityY(-200); // Shoot the bullet upward
        bullet.setOrigin(0.5, 1); // Set origin to bottom center
    }

    update() {
        // Move the invader group
        if (this.cursors.left.isDown) {
            this.invader.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.invader.setVelocityX(100);
        } else {
            this.invader.setVelocityX(0);
        }

        // Check for number key presses
    for (let key in this.numberKeys) {
        if (this.numberKeys[key].isDown && Phaser.Input.Keyboard.JustDown(this.numberKeys[key])) {
            const column = parseInt(key, 10) - 1; // Extract the column number
            const invaderIndex = column * 5; // Each column has 5 invaders (10 rows, 2 invaders per row)
            const invaderInColumn = this.invader.getChildren()[invaderIndex]; // Get the invader sprite in that column
            if (invaderInColumn) {
                this.createBullet(invaderInColumn.x, invaderInColumn.y); // Create a bullet from the invader's position
            }
        }
    }
    }
}
