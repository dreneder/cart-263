class SusageDog extends Animal {
    constructor (x, y, image) {
        super(x, y, image);
        this.found = false;
        this.rotationSpeed = 0.25;
    }

    update() {
        super.update();

        if (this.found) {
            this.angle += this.rotationSpeed;
        }
        console.log(this.found);
    }

    mouseIsPressed() {
        if (mouseX > this.x - this.image.width/2 &&
            mouseX < this.x + this.image.idth/2 &&
            mouseY > this.y - this.image.height/2 &&
            mouseY < this.y + this.image.height/2) {
            this.found = true;
        } 
    }
}