class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        this.animation = 0;
    }

    
    // Function to create game objects
    create ()
    {  

    this.tunnel = this.physics.add.group({
        // collideWorldBounds: true
    });
        

   
    
    let scale = 1.433;
    let tunnelNumber = [];
    let boundaryNumber = [];

    for (let i = 0; i < 8; i++) {
        scale *= 0.75;
        let tunnelSegment = `tunnelSegment${i}`;
        let boundary = `boundary${i}`;
        let boundary2 = `boundary${i+1}`;

        
        
        this[tunnelSegment] = this.physics.add.sprite(512,384,`tunnel`).setScale(scale);
        this.anims.create({
            key: 'tunnel',
            frames: this.anims.generateFrameNumbers(`tunnel`),
            frameRate: 9,
            repeat: -1 // Repeat indefinitely
        });
        this[boundary] = new Phaser.Geom.Rectangle(512, 384, 1024*scale, 768*scale)
        tunnelNumber.push(this[tunnelSegment]);
        boundaryNumber.push(this[boundary]);
        this.tunnel.add(this[tunnelSegment]);
        this[tunnelSegment].play('tunnel');
        
        this[tunnelSegment].body.setBoundsRectangle(this[boundary2]);

        this.physics.world.on('worldbounds', (body, up, down, left, right) =>
        {
            const { gameObject } = body;

            if (up) { gameObject.setAngle(90); }
            else if (down) { gameObject.setAngle(-90); }
            else if (left) { gameObject.setAngle(0); }
            else if (right) { gameObject.setAngle(180); }
        });
    }
    this.tweens.add({
        targets: this.tunnel.anims,
        timeScale: { from: 0, to: 2 },
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: 0,
        // repeatDelay: 1000,
        // hold: 5000,
        // duraton: 5000
    });

    
    this.cursors = this.input.keyboard.createCursorKeys();
}
update () {
    if (this.cursors.up.isDown) {
        // Increase frame rate gradually
        
        this.animation += 0.01;
        
        // Set new frame rate for the animation
        // this.tunnel.anims.setTimeScale(this.frameRate);
    }
    else if (this.cursors.down.isDown) {
        
        this.animation -= 0.01;
        
        // Set new frame rate for the animation
        // this.tunnel.anims.setTimeScale(this.frameRate);
    }
    if (this.cursors.right.isDown) {
            this.tunnelSegment().setVelocityX(100);
        }
        else if (this.cursors.left.isDown) {
                this.tunnel.setVelocityX(-100);
            }
            else {
                    this.tunnel.setVelocityX(0);
                }
                console.log(this.animation);
                
                if (this.animation < 0) {
                    this.tunnel.children.iterate(function(child) {
                        child.anims.reverse();
                        });
                }

                
                // else {
                //     this.tunnel.children.iterate(function(child) {
                //         child.anims.play();
                //         });
                // }
                
                if (this.animation >= 3) {
                    this.animation = 3;
                }
                else if (this.animation <= -3) {
                    this.animation = -3;
                }
                let test = this.animation;
                
                this.tunnel.children.iterate(function(child) {
                    if (test >= 0) {
                        child.anims.timeScale = test;
                    }
                    else {
                        child.anims.timeScale = -test;
                    }
                    });
            }
        }
        
        