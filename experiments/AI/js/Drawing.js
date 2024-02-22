class Drawing{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = windowWidth/5*4;
        this.height = windowHeight/3*2;
    }

    displayBoard() {
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        strokeWeight(3);
        rect(0,0,this.width,this.height);
        pop();
    }

    displayButtons() {
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        strokeWeight(3);
        rect(0,0,this.width,this.height);
        pop();
    }
}