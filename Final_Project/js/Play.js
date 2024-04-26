class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        this.animation = 0;
        this.speed = 0;
        this.maxSpeed = 0;
        this.speedFactor = 0;
        this.mapSpeed = 0;
        this.gauge = 0;
        this.direction = true;
        this.emergency = false;
        this.tunnelX = 600;
        this.tunnelY = 400;
    }    
    
    create () {
        
        //adding a background
        this.add.image(600,400,`background`);

        this.tunnel = this.physics.add.group({
            collideWorldBounds: true
        });
        let scale = 0.011;
    
        for (let i = 0; i < 7; i++) {
        scale *= 1.9;
        let tunnelSegment = `tunnelSegment${i}`;
        
        // Create sprite
        this[tunnelSegment] = this.physics.add.sprite(600, 400, 'tunnel').setScale(scale);
    
        // Set collide world bounds
        // this[tunnelSegment].body.setCollideWorldBounds(true);
    
        // Create animation with a unique key for each sprite
        this.anims.create({
            key: `tunnel`,
            frames: this.anims.generateFrameNumbers('tunnel',{ start: 0, end: 59 }),
            frameRate: 60,
            repeat: -1, // Repeat indefinitely
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
            repeat: -1,
        });

        //drawing the cockpit
        this.cockpit = this.add.image(600,500,`cockpit`);
        this.lever = this.physics.add.sprite(1018,850,`lever`).setInteractive().setCollideWorldBounds(true); // lever
        this.stop = this.physics.add.sprite(97,823,`stop`).setScale(1).setInteractive(); // pressable button
        this.directionScreen = this.add.sprite(600,500,`direction`);
        this.pointer = this.add.sprite(600,500,`pointer`);

        // handle all graphics for the map path
        this.graphics = this.add.graphics();

        // creates a vectored path
        this.path = { t: 0, vec: new Phaser.Math.Vector2()};

        this.points = []; // array for the path

        // points for the path
        this.points.push(new Phaser.Math.Vector2(775, 802));
        this.points.push(new Phaser.Math.Vector2(665, 800));
        this.points.push(new Phaser.Math.Vector2(627, 780));
        this.points.push(new Phaser.Math.Vector2(615, 730));
        this.points.push(new Phaser.Math.Vector2(580, 710));
        this.points.push(new Phaser.Math.Vector2(540, 710));
        this.points.push(new Phaser.Math.Vector2(500, 710));
        this.points.push(new Phaser.Math.Vector2(475, 730));
        this.points.push(new Phaser.Math.Vector2(449, 765));
        this.points.push(new Phaser.Math.Vector2(423, 800));
        this.points.push(new Phaser.Math.Vector2(420, 830));
        this.points.push(new Phaser.Math.Vector2(445, 840));
        this.points.push(new Phaser.Math.Vector2(505, 837));
        this.points.push(new Phaser.Math.Vector2(545, 852));
        this.points.push(new Phaser.Math.Vector2(575, 880));
        this.points.push(new Phaser.Math.Vector2(610, 910));
        this.points.push(new Phaser.Math.Vector2(650, 910));
        this.points.push(new Phaser.Math.Vector2(717, 870));
        this.points.push(new Phaser.Math.Vector2(785, 830));
        this.points.push(new Phaser.Math.Vector2(795, 806));
        this.points.push(new Phaser.Math.Vector2(775, 802));

        this.curve = new Phaser.Curves.Spline(this.points);

        this.map =  this.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 50000,
            repeat: -1,
            paused: true // Pause the tween initially
        });


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
            this.emergency = true;
        });

        // Scale back to normal when pointer is released
        this.stop.on('pointerup', (pointer) => {
            this.stop.setScale(1)
        });

        this.speedometer = this.add.text(200, 898, this.speed.toFixed(), { fontFamily: 'Calibri', fontSize: 35, color: '#00ff00', align: 'right' });
        this.speedometer2 = this.add.text(265, 895, 'km/h', { fontFamily: 'Calibri', fontSize: 20, color: '#00ff00' });
        this.speedometer.rotation = -0.2;
        this.speedometer2.rotation = -0.2;
    

   
}

createTunnelTween(x, y, duration) {
    this.tweens.add({
        targets: [ this.tunnelSegment0, this.tunnelSegment1, this.tunnelSegment2, this.tunnelSegment3,
            this.tunnelSegment4, this.tunnelSegment5, this.tunnelSegment6, this.tunnelSegment8, this.tunnelSegment9],
        x: x,
        y: y,
        duration: duration,
        ease: 'Sine.easeInOut',
        delay: this.tweens.stagger(100)
    });
}

update () {
    // erases the train path
    this.graphics.clear();

    // Invisible line and points
    this.graphics.lineStyle(1, 0xffffff, 0);
    this.graphics.fillStyle(0x00ff00, 0);

    // from the example,
    this.curve.draw(this.graphics, 64);

    for (let i = 0; i < this.points.length; i++)
    {
        this.graphics.fillCircle(this.points[i].x, this.points[i].y, 4);
    }

    // draws the point
    this.curve.getPoint(this.path.t, this.path.vec);
    this.graphics.fillStyle(0xff0000, 1);
    this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);

    // calculates the precentage on the path
    this.percentage = this.path.t * 100;
    console.log("Percentage:", this.percentage.toFixed(1), "%");
    
    // // setting the forward or backward sprites and sets the animation direction
    if (this.lever.y > 865) {
        this.directionScreen.setFrame(2);
        this.direction = false;
        this.map.timeScale = -1;
        this.map.play();
        this.tunnel.children.iterate(function(child) {
            child.anims.inReverse = true;
        });
        if (this.path.t*100 < 0.1) {
            this.map.play();
        }
    }
    else if (this.lever.y < 835) {
        this.directionScreen.setFrame(1);
        this.direction = true;
        this.map.timeScale = 1;
        this.map.play();
        this.tunnel.children.iterate(function(child) {
            child.anims.inReverse = false;
        });
    }
    else {
        this.directionScreen.setFrame(0);
    }   
    
    // calculates the normalized value of the lever between 0 and 1 to scale the gauge
    const normalizedValue = (this.lever.y - 850) / (950 - 850);
    const scaledGauge = Phaser.Math.Clamp(normalizedValue, -1, 1);
    
    //multiplies by the nmumber of frames
    this.gauge = scaledGauge*23;
    
    // convertes negative into positive
    if (this.gauge < 0) {
        this.gauge *= -1;
    }
    
    const speed = Phaser.Math.Clamp(this.gauge, 0, 23);
    // converts the gauge to speed
    this.maxSpeed = speed*7;
    this.pointer.setFrame(this.gauge.toFixed());
    
    this.speedFactor = this.gauge*0.01;
    
    if (this.maxSpeed > 0 && this.speed < this.maxSpeed) {
        this.speed += this.speedFactor;
    }
    else if (this.maxSpeed >= 0 && this.speed > this.maxSpeed) {
        if (this.speedFactor > 0) {
            this.speed -= this.speedFactor;  
        }
        else {
            if (this.emergency) {
                this.speedFactor = 1;
            }
            else {
                this.speedFactor = 0.3;  
            }
            this.speed -= this.speedFactor;  
        } 
    }
    
    if (this.speed < 0) {
        this.speed = 0;
        this.emergency = false;
        this.map.timeScale = 0;
    }
    // updates the speedometer
    this.speedometer.setText(this.speed.toFixed());
    
    const minMapSpeed = 50000;
    const maxMapSpeed = 100000;
    
    const normalizedSpeed = Phaser.Math.Clamp((this.speed - 0) / (161 - 0), 0, 1);
    
    // Map the normalized speed to mapSpeed
    this.mapSpeed = Phaser.Math.Linear(maxMapSpeed, minMapSpeed, normalizedSpeed);
    
    const normalizedAnimation = Phaser.Math.Clamp(normalizedSpeed, 0, 3);
    
    this.animation = normalizedAnimation;
    
    if (this.animation < 0) {
        this.tunnel.children.iterate(function(child) {
            child.anims.reverse();
        });
    }
                
            if (this.animation >= 3) {
                this.animation = 3;
            }
            
            let test = this.animation;
            
            this.tunnel.children.iterate(function(child) {
                child.anims.timeScale = normalizedAnimation;
            });
            
            // determining where the tunnel curves
            if (this.percentage > 5 && this.percentage < 6) {
                this.tunnelX = 950;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 10 && this.percentage < 11) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 15 && this.percentage < 16) {
                this.tunnelX = 450;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 20 && this.percentage < 21) {
                this.tunnelX = 600;
                this.tunnelY = 300;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 25 && this.percentage < 26) {
                this.tunnelX = 600;
                this.tunnelY = 200;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 30 && this.percentage < 31) {
                this.tunnelX = 500;
                this.tunnelY = 200;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 35 && this.percentage < 36) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 40 && this.percentage < 41) {
                this.tunnelX = 600;
                this.tunnelY = 450;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 45 && this.percentage < 46) {
                this.tunnelX = 400;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 50 && this.percentage < 51) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 55 && this.percentage < 56) {
                this.tunnelX = 800;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 60 && this.percentage < 61) {
                this.tunnelX = 600;
                this.tunnelY = 300;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }
            else if (this.percentage > 65 && this.percentage < 66) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 70 && this.percentage < 71) {
                this.tunnelX = 450;
                this.tunnelY = 300;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 2000);
            }
            else if (this.percentage > 75 && this.percentage < 76) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 80 && this.percentage < 81) {
                this.tunnelX = 200;
                this.tunnelY = 600;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 85 && this.percentage < 86) {
                this.tunnelX = 600;
                this.tunnelY = 700;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 90 && this.percentage < 91) {
                this.tunnelX = 50;
                this.tunnelY = 200;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage > 95 && this.percentage < 96) {
                this.tunnelX = 500;
                this.tunnelY = 350;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 1000);
            }
            else if (this.percentage >= 98) {
                this.tunnelX = 600;
                this.tunnelY = 400;
                this.createTunnelTween(this.tunnelX, this.tunnelY, 3000);
            }


            
        }
        
    }
    
    