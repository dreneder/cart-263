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
        this.avatar.setVelocityX(150);
        this.avatar.setBounceX(1);
        
        this.invaders = this.physics.add.group({
            collideWorldBounds: true,
        });
        
        let invaderNumber = [];

        this.childrenLeft = false;
        this.childrenRight = false;

        //generates invader children for the group
        for (let i = 0; i < 50; i++) {
            let invaderName = `invader${i}`;
            this[invaderName] = this.physics.add.sprite(0,0,`invader`);
            invaderNumber.push(this[invaderName]);
            this.invaders.add(this[invaderName]);
        };

        // Align the invader sprites in a grid
    Phaser.Actions.GridAlign(this.invaders.getChildren(), {
        width: 10,
        height: 5,
        cellWidth: 70,
        cellHeight: 50,
        x: 200,
        y: 500
    });

        // Create a group for bullets
        this.bullet = this.physics.add.group({
            key: `bullet`
        });

        

// Loop through each sprite in the group
this.invaders.getChildren().forEach(invader => {
    // Check if the invader has reached the left or right bounds of the world
    if (invader.x <= 0 || invader.x >= this.physics.world.bounds.width) {
        // Apply logic here when an invader reaches the world bounds
        // For example, you can change its velocity or position
       console.log(`reached`)
    }
});



        this.input.on('pointerup', event => {
            const invaderAtIndex1 = this.invaders.getChildren()[3];
            
            if (invaderAtIndex1) {
                // Destroy the invader sprite at index #1
                invaderAtIndex1.destroy();
                // this.invaders.destroy();
            }
        }, this);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        // creating number keys to shoot
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
    }
   

    update() {
        // Move the invader group
        if (this.cursors.left.isDown && this.childrenLeft === false) {
            this.invaders.setVelocityX(-100);
        } else if (this.cursors.right.isDown && this.childrenRight === false) {
            this.invaders.setVelocityX(100);
        } else {
            this.invaders.setVelocityX(0);
        }
       // Calculate the minimum and maximum x positions based on the invaders group
    const invadersChildren = this.invaders.getChildren();
    if (invadersChildren.length > 0) {
        const minX = Math.min(...invadersChildren.map(invader => invader.x));
        const maxX = Math.max(...invadersChildren.map(invader => invader.x + invader.width));
        // console.log(minX);
        // Ensure the avatar's x position stays within the range of minX and maxX
        if (this.avatar.x > maxX) {
            this.avatar.setVelocityX(-150);
        }
        else if (this.avatar.x < minX) {
            this.avatar.setVelocityX(150);
        }
        // this.avatar.x = Phaser.Math.Clamp(this.avatar.x, minX, maxX - this.avatar.width);
    }


 // Check for number key presses
for (let key in this.numberKeys) {
    if (this.numberKeys[key].isDown) {
        let row = 1;
        for (let i = 0; i < row; i++) {
        // Convert key to a number
        let column = parseInt(key, 10) - 1;

        let invaderName = `invader${column}`;


        // Check if the invader sprite exists and is active (not destroyed)
        if (this[invaderName] && this[invaderName].active) {
            // Create a bullet at the invader's position
            this.bullet.create(this[invaderName].x, this[invaderName].y, `bullet`);
            this.bullet.setVelocityY(-500);
        } else {
            // Add 10 to the column number
            column += i*10;
            // Create a new invader name based on the updated column number
            invaderName = `invader${column}`;
            // Check if the invader sprite exists and is active (not destroyed) after adding 10 to the column number
            if (this[invaderName] && this[invaderName].active) {
                // Create a bullet at the new invader's position
                this.bullet.create(this[invaderName].x, this[invaderName].y, `bullet`);
                this.bullet.setVelocityY(-500);
            }
            else {if (row <= 5) {
                        row++
            }
        }
        }
        }
    }
}
    }
}

