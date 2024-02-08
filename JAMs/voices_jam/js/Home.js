class Home {
    displayTitle() {
        // displays the word "speech"
        fill(0);
        textSize(50);
        text(`speech`,width/2,height/4-110);
    
        // variable for the title
        let title = "PICTIONARY";
      
        // setting a colour for each letter of the title
        let colors = [
            color(163, 94, 73),
            color(0, 255, 0),
            color(69, 159, 255),
            color(255, 255, 0),
            color(255, 0, 255),
            color(0, 255, 255),
            color(255, 165, 0),
            color(128, 0, 128),
            color(255, 0, 0),
            color(0)
        ];
      
        // Set text size
        textSize(110);
        textAlign(CENTER,CENTER);
        
        // title initial x position
        let x = width/2 -330;
      
        // for loop to display letters with different colors
        for (let i = 0; i < title.length; i++) {
            fill(colors[i]); // sets fill colour in order of the array
            text(title[i], x, height/4); // draw letter at position
            x += textWidth(title[i]) + 10; // adds value to x position of next letter
      }
    }

    displayCards() {
        //display card piles
    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(width/2-200,height/2,350,150);
    rect(width/2+200,height/2,350,150);
    rect(width/2-200,height/2+200,350,150);
    rect(width/2+200,height/2+200,350,150);

    //display piles text
    fill(255);
    textSize(40);
    text(`Object`,width/2-200,height/2);
    text(`Movie`,width/2-200,height/2+200);
    text(`All Play`,width/2+200,height/2+200);
    textSize(32);
    text(`Person/Place/Animal`,width/2+200,height/2);
    }
}