class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        this.animation = 0;
        this.speed = 0;
        this.maxSpeed = 0;
        this.gauge = 0;
        this.direction = true;
    }    

    create () {
        //drawing the cockpit
        this.cockpit = this.add.image(600,500,`cockpit`);
        this.lever = this.physics.add.sprite(1018,850,`lever`).setInteractive().setCollideWorldBounds(true); // lever
        this.stop = this.physics.add.sprite(97,823,`stop`).setScale(1).setInteractive(); // pressable button
        this.directionScreen = this.add.sprite(600,500,`direction`);
        this.pointer = this.add.sprite(600,500,`pointer`);

        // lever position: 0 - 1018,850
        // lever position: max high - 1018,850
        // lever position: max high - 1018,750
        // lever position: max low - 1018,950

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

        this.tween =  this.tweens.add({
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
        });

        // Scale back to normal when pointer is released
        this.stop.on('pointerup', (pointer) => {
            this.stop.setScale(1)
        });

        this.speedometer = this.add.text(200, 898, this.speed.toFixed(), { fontFamily: 'Calibri', fontSize: 35, color: '#00ff00' });
        this.speedometer2 = this.add.text(265, 895, 'km/h', { fontFamily: 'Calibri', fontSize: 20, color: '#00ff00' });
        this.speedometer.rotation = -0.2;
        this.speedometer2.rotation = -0.2;
    
   
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
    const percentage = this.path.t * 100;
    // console.log("Percentage:", percentage.toFixed(1), "%");
    
    // // setting the forward or backward sprites and sets the animation direction
    if (this.lever.y > 865) {
        this.directionScreen.setFrame(2);
        this.direction = false;
        this.tween.timeScale = -1;
        this.tween.play();
        if (this.path.t*100 < 0.1) {
            this.tween.play();
        }
    }
    else if (this.lever.y < 835) {
        this.directionScreen.setFrame(1);
        this.direction = true;
        this.tween.timeScale = 1;
        this.tween.play();
    }
    else {
        this.directionScreen.setFrame(0);
        this.tween.timeScale = 0;
    }
    
    if (this.animation >= 3) {
        this.animation = 3;
    }
    else if (this.animation <= -3) {
        this.animation = -3;
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
        this.speed -= 0.1;  
    } 
}

if (this.speed < 0) {
    this.speed = 0;
}

this.speedometer.setText(this.speed.toFixed());



console.log(this.gauge,this.maxSpeed,this.speed.toFixed());
        }
}
        
        