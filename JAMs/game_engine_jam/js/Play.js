class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create() {
        //Create the avatar
        this.avatar = this.physics.add.sprite(600, 100, `avatar`);
        this.avatar.setCollideWorldBounds(true);
        this.avatar.setScale(.1);
        this.avatar.setAngle(180);
        this.avatar.setVelocityX(50);
        this.avatar.setBounceX(1);


        this.invader = this.physics.add.group({
            key: `invader`,
            quantity: 50,
            collideWorldBounds: true,
        });


        Phaser.Actions.GridAlign(this.invader.getChildren(), {
            width: 10,
            
            cellWidth: 70,
            cellHeight: 50,
            x: 200,
            y: 500
        });
        
   

        this.cursors = this.input.keyboard.createCursorKeys();

        
    }
    
    
    update() {
        if (this.cursors.left.isDown) {
                this.invader.setVelocityX(-100);
            }
        else if (this.cursors.right.isDown) {
                this.invader.setVelocityX(100);
            }
        else {
                this.invader.setVelocityX(0);
            }


    }
    
}

