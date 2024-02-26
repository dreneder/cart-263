class Drawing{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = windowWidth/5*4;
        this.height = windowHeight/3*2;
        this.pencil = {button,stroke: 3}; // for the buttons selection
        this.eraser = {button,stroke: 3};
        this.clear = {button,stroke: 3};
        this.paint = [];
    }

    displayBoard() {
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        strokeWeight(3);
        rect(0,0,this.width,this.height);
        if (isDrawing) {
            let point = {
              x1: px,
              y1: py,
              x2: mouseX,
              y2: mouseY
            }
            currentPath.push(point);
            px = mouseX;
            py = mouseY;
          }
        
          for (let i = 0; i < drawings.length; i++) {
            let path = drawings[i];
            if (drawings[i].length != 0) {
              for (let j = 0; j < path.length; j++) {
                strokeWeight(2);
                stroke(200);
                line(path[j].x1, path[j].y1, path[j].x2, path[j].y2);
              }
            }
          }
        pop();
    }

    displayButtons() {
        push();
        translate(this.x,this.y);
        rectMode(CENTER);
        fill(255);
        stroke(0);
        strokeWeight(this.pencil);
        rect(-65,40+this.height/2,50);
        strokeWeight(this.eraser);
        rect(0,40+this.height/2,50);
        strokeWeight(this.clear);
        rect(90,40+this.height/2,100,50);
        noStroke();
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(30);
        text(`clear`,87,42+this.height/2);
        pop();
    }

 

    startPath() {
        px = mouseX;
        py = mouseY;
      
        console.log("——");
        console.log("You started a new path!");
        isDrawing = true;
        currentPath = [];
        drawings.push(currentPath);
        console.log("A new array of points is pushed in 'drawing'");
        console.log(currentPath);
      
      }
      
    endPath() {
        console.log("You released the pen, and ended this path!");
        console.log("There is " + drawings.length + " paths in 'drawing' now.");
        console.log("Let see the content of the drawing array:");
        console.log(drawings);
        isDrawing = false;
        console.log("You're not drawing right now");
      }
}

