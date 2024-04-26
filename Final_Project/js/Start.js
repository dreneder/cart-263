class Start extends Phaser.Scene {
    constructor() {
        super({
            key: `start`
        });
        
    }    
    
    create () {
        
        //adding a background
        this.add.image(600,500,`background`);

        
        this.lever = this.physics.add.sprite(1018,850,`lever`).setInteractive().setCollideWorldBounds(true); // lever
        this.stop = this.physics.add.sprite(97,823,`stop`).setScale(1).setInteractive(); // pressable button
        

        this.title = this.add.text(90, 200, `METROPOLITAN`, { fontFamily: 'Arial', fontSize: 130, color: '#000000', align: 'center' });

        this.start = this.add.rectangle(600, 500, 200, 100, 0x00ff00);
        this.start.setOrigin(0.5);
        this.start.setInteractive();
        
        // text for the button
        this.buttonText = this.add.text(600, 500, `START`, { fontFamily: 'Arial', fontSize: 50, color: '#000000', align: 'center' });
        this.buttonText.setOrigin(0.5);


        this.add.text(150, 800, `BRAKE`, { fontFamily: 'Arial', fontSize: 30, color: '#000000', align: 'right' });
        this.add.text(700, 800, `SPEED / POWER`, { fontFamily: 'Arial', fontSize: 30, color: '#000000', align: 'right' });

        this.lever.on('pointerdown', (pointer) => {
            this.lever.setTint(0xdddddd);
            this.lever.followPointer = true; // lever follows the mouse
        });
    
        // Update the sprite position while the pointer is down
        this.input.on('pointermove', (pointer) => {
            if (this.lever.followPointer) {
                this.lever.y = pointer.y;
            }
        });
    
        this.input.on('pointerup', (pointer) => {
            this.lever.clearTint();
            this.lever.followPointer = false; // stop following the mouse
            if (this.lever.y < 865 && this.lever.y > 835) {
                this.lever.y = 850;
            }
        });

        if (this.lever.followPointer) {
            this.input.on('pointerout', (pointer) => {
                this.lever.clearTint();
                this.lever.followPointer = false; // stop following the mouse
                if (this.lever.y < 865 && this.lever.y > 835) {
                    this.lever.y = 850;
                }
            });    
        }
        // adding a limiter for the lever
        this.limiter = new Phaser.Geom.Rectangle(888, 735, 260, 230);
        this.lever.body.setBoundsRectangle(this.limiter);

       
        this.stop.on('pointerdown', (pointer) => {
            this.stop.setScale(0.9);
            this.lever.y = 850;
        });
        
        // Scale back to normal when pointer is released
        this.stop.on('pointerup', (pointer) => {
            this.stop.setScale(1)
        });
        
        //CLICK START
        this.start.on('pointerdown', () => {
            this.scene.start(`play`);
        });
        

   
}
        
    }
    
    