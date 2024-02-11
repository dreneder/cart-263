class Home {
    constructor (){
        // color of piles
        this.pilePickedColor = {
            object: color(255,0,0),
            ppa: color(255,0,0),
            movie: color(255,0,0),
            all: color(255,0,0)
        };
    }

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
    noStroke();
    fill(this.pilePickedColor.object);
    rect(width/2-200,height/2,350,150);
    fill(this.pilePickedColor.ppa);
    rect(width/2+200,height/2,350,150);
    fill(this.pilePickedColor.movie);
    rect(width/2-200,height/2+200,350,150);
    fill(this.pilePickedColor.all);
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

    categoryWheel() { // this method shuffles the piles and gives a random card when a category is chosen
        //
        if (cardDrawn === true) {
            if (chosenCategory === `allPlay`) {
                cards = [random(8)];
                this.pilePickedColor.all = color(255,126,13);
            }
            else if (chosenCategory === `objects`) {
                cards = [random(0,2)];
                this.pilePickedColor.object = color(255,126,13);
            }
            else if (chosenCategory === `ppa`) {
                cards = [random(3,5)];
                this.pilePickedColor.ppa = color(255,126,13);
            }
            else if (chosenCategory === `movie`) {
                cards = [random(6,8)];
                this.pilePickedColor.movie = color(255,126,13);
            }

            // shows the timer to start and countsdown
            if (frameCount % 60) {
                startTimer--
            }
            fill(0);
            textSize(50);
            text(startTimer,width/2,height-150);

            // changes state when timer reaches 0
            if (startTimer <= 0) {
                startTimer = 0;
                state = `card`
                // resets a few parameters used in card
                cardTimer = 63;
                rightCard = false;
            }
        }
    }

    handleSpeechInput() {
        if (speechRecognizer.resultValue) {
            let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
        
            if (lowerCaseResult.match("object")) {
                speechRecognizer.onResult;
                cardDrawn = true;
                chosenCategory = `object`;
            }
            else if (lowerCaseResult.match("person") ||
                    lowerCaseResult.match("place") ||
                    lowerCaseResult.match("animal")) {
                speechRecognizer.onResult;
                cardDrawn = true;
                chosenCategory = `ppa`;
            }
            else if (lowerCaseResult.match("movie") ||
                    lowerCaseResult.match("film")) {
                speechRecognizer.onResult;
                cardDrawn = true;
                chosenCategory = `movie`;
            }
            else if (lowerCaseResult.match("all play")) {
                speechRecognizer.onResult;
                cardDrawn = true;
                chosenCategory = `allPlay`;
            }
          
        }
        
        
        }
}