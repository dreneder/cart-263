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

        this.shipBullet = this.physics.add.group({
        });

        this.shooter = true;

        
        // Set up a timer event to shoot a bullet
        this.shipShootTimer = this.time.addEvent({
            delay: Phaser.Math.Between(100, 2000), // Random at .6 and 2 seconds
            callback: this.shipShootBullet,
            callbackScope: this,
            loop: true
        });
        

    
        // Adds the invader group
        this.invaders = this.physics.add.group({
            collideWorldBounds: true,
            velocityY: -7 
        });
        
        let invaderNumber = [];

        //generates invader children for the group
        for (let i = 0; i < 50; i++) {
            let invaderName = `invader${i}`;
            this[invaderName] = this.physics.add.sprite(0,0,`invader`);
            this[invaderName].cooldown = false;
            invaderNumber.push(this[invaderName]);
            this.invaders.add(this[invaderName]);

            // if (this[invaderName].cooldown) {
            //  // Initialize cooldown timer for each invader
            //     this.invaderCooldowns = this.time.addEvent({
            //  delay: 3000, // 3-second cooldown
            //  callback: () => { this.invaderCooldown(invaderName); },
            //  callbackScope: this,
            //  loop: true
            //   });
            // }
        };

        // Align the invader sprites in a grid
    Phaser.Actions.GridAlign(this.invaders.getChildren(), {
        width: 10,
        height: 5,
        cellWidth: 70,
        cellHeight: 50,
        x: 200,
        y: 750
    });

        // Create a group for bullets
        this.invBullet = this.physics.add.group({
            key: `bullet`
        });

        
        
        // these will lock the group of invaders within the world bounds
        this.lockLeft = false;
        this.lockRight = false;
        
        
        this.input.on('pointerup', event => {
            const invaderAtIndex1 = this.invaders.getChildren()[0];
            if (invaderAtIndex1) {
                // Destroy the invader sprite at index #1
                invaderAtIndex1.destroy();
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
        
        
        this.physics.add.overlap(this.invBullet, this.avatar, this.avatarHit, null, this);

        this.physics.add.collider(this.shipBullet, this.invaders, this.invaderHit, null, this);

    }
   
    shipShootBullet() {
        // Create a bullet at the avatar's position
        if (this.shooter) {
        this.shipBullet.create(this.avatar.x, this.avatar.y+30, 'bullet2');
        this.shipBullet.setVelocityY(500); // Set bullet velocity
        }
        this.shipShootTimer.delay = Phaser.Math.Between(100, 2000);
    }

    avatarHit(avatar, bullet) {
        bullet.destroy(); // Destroy the bullet
        avatar.setVelocityX(0);
        avatar.setTint(0xff0000);
        this.shooter = false;
        setTimeout(() => {
            avatar.setVelocityX(150);
            avatar.clearTint();
            this.shooter = true;
        }, 2000);
    }

    invaderHit(bullet, invader) {
        bullet.destroy(); // Destroy the bullet
        invader.destroy(); // Destroy the invader
    }

    

    update() {
        // Move the invader group
        if (this.cursors.left.isDown && this.lockLeft === false) {
            this.invaders.setVelocityX(-200);
        } else if (this.cursors.right.isDown && this.lockRight === false) {
            this.invaders.setVelocityX(200);
        } else {
            this.invaders.setVelocityX(0);
        }
 
       // Calculate the minimum and maximum x positions based on the invaders group
    const invadersChildren = this.invaders.getChildren();
    if (invadersChildren.length > 0) {
        const minX = Math.min(...invadersChildren.map(invader => invader.x));
        const maxX = Math.max(...invadersChildren.map(invader => invader.x + invader.width));
        const minY = Math.min(...invadersChildren.map(invader => invader.y));
        // console.log(minX);
        // Ensure the avatar's x position stays within the range of minX and maxX
        if (this.avatar.x > maxX) {
            this.avatar.setVelocityX(-150);
        }
        else if (this.avatar.x < minX) {
            this.avatar.setVelocityX(150);
        }
        //limits the position within the world bounds
        if (minX <= 30) {
            this.lockLeft = true;
        }
        else if (maxX >= 1220) {
            this.lockRight = true;
        }
        else{
            this.lockLeft = false;
            this.lockRight = false;
        }
        if (minY <= this.avatar.y+this.avatar.height/10) {
            console.log(`win`);
            winGame = true;
        }
    }



 // Check for number key presses
for (let key in this.numberKeys) {
    if (Phaser.Input.Keyboard.JustDown(this.numberKeys[key])) {
        let row = 1;
        for (let i = 0; i < row; i++) {
            // Convert key to a number
            let column = parseInt(key, 10) - 1;
            let invaderName = `invader${column}`;

            // Check if the invader sprite exists and is active (not destroyed)
            if (this[invaderName] && this[invaderName].active ) {
                if (!this[invaderName].cooldown) {
                // Create a bullet at the invader's position
                this.invBullet.create(this[invaderName].x, this[invaderName].y, `bullet`);
                this.invBullet.setVelocityY(-500);
                this[invaderName].setTint(0xff0000);
                
                // Set cooldown for this invader
                this[invaderName].cooldown = true;
                
                // Set a timer to reset the cooldown after 3 seconds
                setTimeout(() => {
                    this[invaderName].cooldown = false;
                    this[invaderName].clearTint();
                }, 3000);
            }
        } else {
            // Add 10 to the column number
            column += i * 10;
            // Create a new invader name based on the updated column number
            invaderName = `invader${column}`;
            // Check if the invader sprite exists and is active (not destroyed) after adding 10 to the column number
            if (this[invaderName] && this[invaderName].active) {
                if (!this[invaderName].cooldown) {
                    // Create a bullet at the new invader's position
                    this.invBullet.create(this[invaderName].x, this[invaderName].y, `bullet`);
                    this.invBullet.setVelocityY(-500);
                    this[invaderName].setTint(0xff0000);
                    
                    // Set cooldown for this invader
                    this[invaderName].cooldown = true;
                    
                    // Set a timer to reset the cooldown after 3 seconds
                    setTimeout(() => {
                        this[invaderName].cooldown = false;
                        this[invaderName].clearTint();
                    }, 3000);
                }
            } else if (row <= 5) {
                row++;
            }
        }
    }
    }
}
// If all invaders are destroyed, you lose
if (this.invaders.getTotalUsed() === 0) {
    console.log(`lose`);
    this.scene.start('end');
    loseGame = true;
 }
    
    }
}
