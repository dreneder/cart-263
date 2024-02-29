class Sketch{
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
      this.onReturn;
      this.guessColor = color(255,0,0);
    }

    displayBoard() {
        // display the drawing graphic
        push();
        this.onCanvas = collidePointRect(mouseX, mouseY,width/2-this.width/2,height/2-this.height/2,this.width-2,this.height-2);
        rectMode(CENTER);
        noFill();
        stroke(0);
        strokeWeight(3);
        imageMode(CENTER);
        image(intelCanvas,width/2,height/2);
        rect(width/2,height/2,this.width,this.height);
        // changes the mouse cursor
        if (this.onCanvas) {
          noCursor();
          if (this.pencil.button) {
            strokeWeight(45);
            point(mouseX,mouseY);
          }
          else if (this.eraser.button) {
            strokeWeight(3);
            fill(255);
            rect(mouseX,mouseY,50);
          }
        }
        else {cursor()}
        pop();
      }

    displayButtons() {
        // calculates the positions for the buttons
        this.onPencil = collidePointRect(mouseX, mouseY,this.x-65-25,this.y+40+this.height/2-25,50,50);
        this.onEraser = collidePointRect(mouseX, mouseY,this.x-25,this.y+40+this.height/2-25,50,50);
        this.onClear = collidePointRect(mouseX, mouseY,this.x+90-50,this.y+40+this.height/2-25,100,50);
        this.onReturn = collidePointRect(mouseX, mouseY,this.x-this.width/2,this.y+90+this.height/2,130,60);
        
        // display all the buttons for the canvas
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
        fill(255,0,0);
        rect(65-this.width/2,120+this.height/2,130,60);
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(30);
        // draws buttons content
        text(`clear`,87,42+this.height/2);
        fill(255);
        text(`return`,64-this.width/2,122+this.height/2);
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

    mousePressed() {
        // toggles between pencil and eraser
        if (this.onPencil) {
            this.pencil.button = true;
            this.eraser.button = false;
        }
        else if (this.onEraser) {
            this.eraser.button = true;
            this.pencil.button = false;
        }
        // toggles the variable to clear the canvas, look bellow
        else if (this.onClear) {
            this.clear.button = true;
        }
        else if (this.onReturn) { // returns home
            state = `home`;
            animateRandom = false;
        }
        else {
            this.clear.button = false;
            if (frameCount % 480 == 0) {
              // filters the canvas a bit to help the identifier
              intelCanvas.filter(THRESHOLD, 0.5);
            }
            }
    }
    handleInput() {
        if (mouseIsPressed) {
        // calculates mouse position and does button action when pressed
        if (this.onCanvas) {
            if (this.pencil.button) {
                intelCanvas.stroke(0);
                intelCanvas.strokeWeight(45);
                intelCanvas.line(mouseX-this.width/8, mouseY-this.height/4, pmouseX-this.width/8, pmouseY-this.height/4);
            } 
            else if (this.eraser.button) {
                intelCanvas.stroke(255);
                intelCanvas.strokeWeight(55);
                intelCanvas.line(mouseX-this.width/8, mouseY-this.height/4, pmouseX-this.width/8, pmouseY-this.height/4);
            }
        }
        }
      // changes the look of buttons
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
        intelCanvas.background(255); // clears the canvas
      }
      else {this.clear.stroke = 3;}
    }


    displayCard() { //  display the card for the user
      push();
      textAlign(CENTER,CENTER);
      fill(0);
      noStroke();
      textSize(25);
      text(guessCategory,this.x-this.width/2+190,this.y-this.height/2-130);
      textSize(50);
      text(guessCards[userCard],this.x-this.width/2+190,this.y-this.height/2-70);
      fill(this.guessColor);
      text(currentGuess,this.x+this.width/2-150,this.y-this.height/2-100);
      stroke(0);
      noFill();
      pop();

    // actions for when the card is right
    if (currentGuess === guessCards[userCard]) {
      rightGuess = true;
      }
    if (rightGuess) {
        currentGuess = guessCards[userCard]
        this.guessColor = color(0,255,0);
        cursor();
    }
    else {this.guessColor = color(255,0,0);}
    }

    displayTimer() {
        // maps timer according to the answer
        if (rightGuess === false) {
            mappedTimer = map(drawTimer,63,3,60,0,true); // maps to 60 seconds
            if (drawTimer === 3) {
                failSound.play(); // play a horn if it wasn't answered correctly
            }
        }
        else if (rightGuess === true && drawTimer >= 3) { // stops the mapped timer and goes to three seconds
            drawTimer = 2.9;
            computer.speak(`Oh I know, it's ${guessCards[userCard]}`); // plays a cheer sound when the user is correct
        }

        //display the timer
        fill(0);
        textSize(50);
        noStroke();
        textAlign(CENTER,CENTER);
        text(round(mappedTimer),width/2,this.y-this.height/2-100);

         //start the timer once a card is drawn
         if (frameCount % 60 == 0) {
            drawTimer--;
            }
        // returns to home if timer reaches 0
        if (drawTimer < 0) {
            state = `home`;
            // resets a few parameters used in home
            startTimer = 3;
            cardDrawn = false;
        }
    }
}

