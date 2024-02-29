class Home {
    constructor (){
        // color of piles
        this.pilePickedColor = {
            draw: color(0,0),
            guess: color(20,0),
            idk: color(20,0)
        };
        this.onDraw = false;
        this.onGuess = false;
        this.onIDK  = false;
        // to randomize an animation and choice
        this.countRandom = 0;
        this.countRandomPlus = 5;
        this.countRandomPlusMax = 0;
        this.randomPlay = undefined;
    }

    displayTitle() {
        // displays the word "speech" and the instructions
        fill(0);
        textSize(30);
        text(`choose what you want play`,width/2,height/2-height/7);
        textSize(20);
        
        textSize(100);
        textAlign(CENTER,CENTER);
        text(`speech  pictionAIry`,width/2,height/4);
        erase();
        text(`speech`,width/2-300,height/4);
        text(`AI`,width/2+297,height/4);
        noErase();
    }

    displayCards() {
        //display card piles
    erase();
    rect(width/2-200,height/2,350,150);
    rect(width/2+200,height/2,350,150);
    rect(width/2,height/1.4,350,150);
    noErase();
    rectMode(CENTER);
    noStroke();
    fill(this.pilePickedColor.draw);
    rect(width/2-200,height/2,350,150);
    fill(this.pilePickedColor.guess);
    rect(width/2+200,height/2,350,150);
    fill(this.pilePickedColor.idk);
    rect(width/2,height/1.4,350,150);

    //display piles text
    fill(255);
    textSize(40);
    text(`Draw`,width/2-200,height/2);
    text(`Guess`,width/2+200,height/2);
    text(`IDK? you pick`,width/2,height/1.4);
    userCard = round(random(0,8)); // will leave this random running at home
    }

    handleInputAnimations() { // this method for the buttons and for play selection
        this.onDraw = collidePointRect(mouseX,mouseY,width/2-200-350/2,height/2-150/2,350,150);
        this.onGuess = collidePointRect(mouseX,mouseY,width/2+200-350/2,height/2-150/2,350,150);
        this.onIDK = collidePointRect(mouseX,mouseY,width/2-350/2,height/1.4-150/2,350,150);
        //toggles the colors of the buttons
        if (this.onDraw === true) {
            this.pilePickedColor.draw = color(252,3,119);
        }
        else {
            this.pilePickedColor.draw = color(0,0);
            }
        if (this.onGuess === true) {
            this.pilePickedColor.guess = color(252,3,119);
        }
        else {
            this.pilePickedColor.guess = color(0,0);
        }
        if (this.onIDK === true) {
            this.pilePickedColor.idk = color(252,3,119);
        }
        else {
            this.pilePickedColor.idk = color(0,0);
        }
        // starts animation fast based on the frame rate
        if (animateRandom === true && frameCount % this.countRandomPlus == 0) {
            this.countRandom++; 
            this.randomPlay = round(random(0,1));
            if (this.countRandom >= 60) { //slows animation by increasing the count
                this.countRandomPlusMax ++;
                this.countRandomPlus += this.countRandomPlusMax;
            }
            else if (this.countRandom >= 68) {
                this.countRandomPlus++;
            } // randomly assigns one of the two states
            if (this.countRandom >= 70) {
                this.countRandomPlus = 0; // stops the random
                animateRandom = false;
                if (this.randomPlay === 0) {
                    state = `sketch`;
                    this.countRandom = 0
                    this.countRandomPlus = 5
                    this.countRandomPlusMax = 0
                    this.randomPlay = undefined;
                    rightGuess = false;
                }
                else if (this.randomPlay === 1) {
                    state = `guess`;
                    speechRecognizer.start();
                    this.countRandom = 0
                    this.countRandomPlus = 5
                    this.countRandomPlusMax = 0
                    this.randomPlay = undefined;
                }
            }
        }
        // handles the colors
        if (this.randomPlay === 0) {
            this.pilePickedColor.draw = color(252,3,119);
            this.pilePickedColor.guess = color(0,0);
        }
        else if (this.randomPlay === 1) {
            this.pilePickedColor.guess = color(252,3,119);
            this.pilePickedColor.draw = color(0,0);
        }
    }
        mousePressed() {
            if (this.onDraw) {
                state = `sketch`
                rightGuess = false;
            }
            else if (this.onGuess) {
                state = `guess`
                speechRecognizer.start();
            }
            else if (this.onIDK) {
                animateRandom = true;
            }
            // resets a few parameters used in sketch, guess and card
            drawTimer = 63;
            intelCanvas.background(255);
            cardTimer = 63;
            rightCard = false;
            video[cardNumber].time(0);
            video[cardNumber].play();
            speechRecognizer.resultString = ` `;
        }
    }
    
