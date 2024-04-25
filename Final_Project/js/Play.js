class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
        this.animation = 0;
    }    

    create () {
    //drawing the cockpit
    this.cockpit = this.add.image(600,500,`cockpit`);
    this.lever = this.physics.add.sprite(1018,850,`lever`); // lever
    this.stop = this.physics.add.sprite(97,823,`stop`); // pressable button
    this.pointer = this.add.sprite(600,500,`pointer`);

    this.graphics = this.add.graphics();

        this.path = { t: 0, vec: new Phaser.Math.Vector2()};

        this.points = [];

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

        this.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 10000,
            repeat: -1
        });

   
}
update () {
    // erases the train path
    this.graphics.clear();

    // Invisible line and points
    this.graphics.lineStyle(1, 0xffffff, 0);
    this.graphics.fillStyle(0x00ff00, 1);

    // from the example,
    this.curve.draw(this.graphics, 64);

    // 
    for (let i = 0; i < this.points.length; i++)
    {
        this.graphics.fillCircle(this.points[i].x, this.points[i].y, 4);
    }

    // draws the point
    this.curve.getPoint(this.path.t, this.path.vec);

    this.graphics.fillStyle(0xff0000, 1);
    this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);

        

            }
        }
        
        