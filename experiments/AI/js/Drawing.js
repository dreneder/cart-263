class Drawing{
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.width = windowWidth/5*4;
      this.height = windowHeight/3*2;
      this.pencil = {button: true,stroke: 3}; // for the buttons selection
      this.eraser = {button: false,stroke: 3};
      this.clear = {button: false,stroke: 3};
      this.onCanvas; // for drawing on canvas only
      this.onPencil; // to determine buttons position / click
      this.onEraser;
      this.onClear;
    }

    displayBoard() {
        push();
        this.onCanvas = collidePointRect(mouseX, mouseY,width/2-this.width/2,height/2-this.height/2,this.width-2,this.height-2);
        rectMode(CENTER);
        noFill();
        stroke(0);
        strokeWeight(3);
        imageMode(CENTER);
        image(intelCanvas,width/2,height/2);
        rect(width/2,height/2,this.width,this.height);
        if (this.onCanvas) {
          noCursor();
          if (this.pencil.button) {
          strokeWeight(35);
          point(mouseX,mouseY);
        }
        else if (this.eraser.button) {
            strokeWeight(3);
            fill(255);
            rect(mouseX,mouseY,40);
          }
        }
        else {cursor()}
        pop();
      }

    displayButtons() {
        this.onPencil = collidePointRect(mouseX, mouseY,this.x-65-25,this.y+40+this.height/2-25,50,50);
        this.onEraser = collidePointRect(mouseX, mouseY,this.x-25,this.y+40+this.height/2-25,50,50);
        this.onClear = collidePointRect(mouseX, mouseY,this.x+90-50,this.y+40+this.height/2-25,100,50);
        
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        strokeWeight(this.pencil.stroke);
        rect(-65,40+this.height/2,50);
        strokeWeight(this.eraser.stroke);
        rect(0,40+this.height/2,50);
        strokeWeight(this.clear.stroke);
        rect(90,40+this.height/2,100,50);
        noStroke();
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(30);
        // draws buttons content
        text(`clear`,87,42+this.height/2);
        push();
        translate(-65,40+this.height/2);
        fill(0);
        noStroke();
        angleMode(DEGREES);
        rotate(45);
        rect(0,-3,12,30,1,1,0,0);
        triangle(-6,14,0,24,6,14,1)
        pop();
        push();
        translate(0,40+this.height/2);
        fill(0);
        rotate(45);
        rect(0,0,15,35,2);
        fill(255);
        rect(0,10,12,12,2);
        pop();
        pop();
        
    }

      


    handleInput() {
      if (mouseIsPressed) {
        if (this.onCanvas) {
          if (this.pencil.button) {
              intelCanvas.stroke(0);
              intelCanvas.strokeWeight(35);
              intelCanvas.line(mouseX-this.width/8, mouseY-this.height/4, pmouseX-this.width/8, pmouseY-this.height/4);
            } 
            else if (this.eraser.button) {
            intelCanvas.stroke(255);
            intelCanvas.strokeWeight(45);
            intelCanvas.line(mouseX-this.width/8, mouseY-this.height/4, pmouseX-this.width/8, pmouseY-this.height/4);
            }
        
        }
        if (this.onPencil) {
          this.pencil.button = true;
          this.eraser.button = false;
        }
        else if (this.onEraser) {
          this.eraser.button = true;
          this.pencil.button = false;
        }
        else if (this.onClear) {
          this.clear.button = true;
        }
      }
      else {
        this.clear.button = false;
        if (frameCount % 480 == 0) {

          intelCanvas.filter(THRESHOLD, 0.5);
        }
        }
      
      if (this.pencil.button) {
        this.pencil.stroke = 6;
        this.eraser.stroke = 3;
      }
      else if (this.eraser.button) {
        this.pencil.stroke = 3;
        this.eraser.stroke = 6;
      }
      if (this.clear.button) {
        this.clear.stroke = 6;
        intelCanvas.background(255);
      }
      else {this.clear.stroke = 3;}
    }
}

