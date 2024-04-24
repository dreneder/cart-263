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
        collideWorldBounds: true
    });
        

   
    
    let scale = 0.033;

    for (let i = 0; i < 13; i++) {
    scale *= 1.3;
    let tunnelSegment = `tunnelSegment${i}`;
    
    
    // Create sprite
    this[tunnelSegment] = this.physics.add.sprite(512, 384, 'tunnel').setScale(scale);

    // Set collide world bounds
    this[tunnelSegment].body.setCollideWorldBounds(true);

    // Create animation with a unique key for each sprite
    this.anims.create({
        key: `tunnel`,
        frames: this.anims.generateFrameNumbers('tunnel'),
        frameRate: 9,
        repeat: -1 // Repeat indefinitely
    });

    // Play animation
    this[tunnelSegment].play(`tunnel`);

    // Add sprite to group or container
    this.tunnel.add(this[tunnelSegment]);

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
            this.tunnelSegment0.setVelocityX(100);
        }
        else if (this.cursors.left.isDown) {
                this.tunnelSegment0.setVelocityX(-100);
            }
            else {
                    this.tunnel.setVelocityX(0);
                }
                for (let i = 1; i < 13; i++) {
    
                    let tunnelSegment = `tunnelSegment${i}`;
                    let tunnelSegment2 = `tunnelSegment${i-1}`;
                    
                    if (this[tunnelSegment].x*1.3 > this[tunnelSegment2].x*1.3 ||
                        this[tunnelSegment].x*-1.3 < this[tunnelSegment2].x*-1.3) {
                        setTimeout(() => {
                            this[tunnelSegment].body.velocity.x = this[tunnelSegment2].body.velocity.x;
                        }, 200);
                    }
                
                }
                console.log(this.tunnelSegment0.body.velocity.x);
                
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
        
        