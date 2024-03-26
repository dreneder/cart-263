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
        this.avatar.setScale(0.15);
        this.avatar.setAngle(180);
        this.avatar.setVelocityX(50);
        this.avatar.setBounceX(1);

        // this.invader.setVelocityY(-100);
        // Create the invader group
        this.invaders = this.add.group({
            quantity: 10,
            gridAlign: {
                width: 10,
            cellWidth: 70,
            x: 200,
            y: 500
        }
        });

        let invader = [];

        for (let i = 0; i < 9; i++) {
            let groupNumber = `invader${i}`;
            let group = this.physics.add.group({
                key: `invader`,
                quantity: 5,
                gridAlign: {
                    width: 1,
                    height: 5,
                    cellHeight: 50,

                },
                collideWorldBounds: true
            });
            invader.push(group);
            this.invaders.add(group);
            this[groupNumber] = group;
        }

        // this.invaders.add(this.invader0);

        

        

        // Phaser.Actions.GridAlign(this.invaders.getChildren(),{
        //     width: 10,
        //     cellWidth: 70,
        //     x: 200,
        //     y: 500
        // });

        // Create a group for bullets
        this.bullet = this.physics.add.group({
            key: `bullet`
        });
        

        this.cursors = this.input.keyboard.createCursorKeys();
        this.numberKeys = this.input.keyboard.addKeys({
            1: Phaser.Input.Keyboard.KeyCodes.ONE,
            2: Phaser.Input.Keyboard.KeyCodes.TWO,
            3: Phaser.Input.Keyboard.KeyCodes.THREE,
            4: Phaser.Input.Keyboard.KeyCodes.FOUR,
            5: Phaser.Input.Keyboard.KeyCodes.FIVE,
            6: Phaser.Input.Keyboard.KeyCodes.SIX,
            7: Phaser.Input.Keyboard.KeyCodes.SEVEN,
            8: Phaser.Input.Keyboard.KeyCodes.EIGHT,
            9: Phaser.Input.Keyboard.KeyCodes.NINE,
            10: Phaser.Input.Keyboard.KeyCodes.ZERO
        });
        

        
        this.input.on('pointerup', event => {
            const invaderAtIndex1 = this.invader1.getChildren()[3];

    if (invaderAtIndex1) {
        // Destroy the invader sprite at index #1
        invaderAtIndex1.destroy();
    }
}, this);
        
    }
   

    update() {
        // Move the invader group
        if (this.cursors.left.isDown) {
            this.invader1.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.invader1.setVelocityX(100);
        } else {
            this.invader1.setVelocityX(0);
        }
  

     // Check for number key presses
    for (let key in this.numberKeys) {
        if (this.numberKeys[key].isDown) {
            if (key === 0) {
                key = 10;
            }
            const column = parseInt(key, 10) - 1; // Extract the column number
            const invaderIndex = column; // Each column has 5 invaders (10 rows, 2 invaders per row)
            const invaderInColumn = this.invader1.getChildren()[invaderIndex]; // Get the invader sprite in that column
            if (invaderInColumn) {
                // Create a bullet at the invader's position
                this.bullet.create(invaderInColumn.x, invaderInColumn.y,`bullet`);
                this.bullet.setVelocityY(-500);
    
    
            }
            console.log(column)
        }
    }
    
    }
    
}
