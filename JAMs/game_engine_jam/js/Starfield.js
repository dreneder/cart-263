class Starfield extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Starfield', active: true });

        this.stars;

        this.distance = 5000;
        this.speed = 500;

        this.max = 300;
        this.xx = [];
        this.yy = [];
        this.zz = [];
    }
    preload () {
        this.load.image(`star`, 'assets/images/star4.png');
    }

    create ()
    {
        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;

        this.stars = this.add.blitter(0, 0, `star`);

        for (let i = 0; i < this.max; i++)
        {
            this.xx[i] = Math.floor(Math.random() * 1500) - 400;
            this.yy[i] = Math.floor(Math.random() * 6000) - 100;
            this.zz[i] = Math.floor(Math.random() * 1700) - 100;

            let perspective = this.distance / (this.distance - this.xx[i]);
            let x = 400 + this.xx[i] * perspective;
            let y = 300 + this.yy[i] * perspective;

            this.stars.create(x, y);
        }
    }

    update (time, delta)
    {
        for (let i = 0; i < this.max; i++)
        {
            let perspective = this.distance / (this.distance - this.zz[i]);
            let x = 300 + this.xx[i] * perspective;
            let y = 0 + this.yy[i] * perspective;

            this.yy[i] += this.speed * (delta / 10000);

            if (this.yy[i] > 1000)
            {
                this.yy[i] -= 1000;
            }

            let bob = this.stars.children.list[i];

            bob.x = x;
            bob.y = y;
        }
    }

}