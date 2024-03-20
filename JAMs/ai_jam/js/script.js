/**
 * Speech PictionAIry
 * André Neder
 * 
 * The Speech PictionAIry is the first time I do a sequel to another program for CART, it follows the game Speech Pictionary that used P5 Speech.
 * The game expands from the previous one and is divided in four states: home, draw, guess and card.
 * When the user is in "home" the user can choose whether to draw or guess a card, or random.
 * When in "guess", the user has to choose a category: Object, Person/Place/Animal, Movie, and All Play (random from the other three).
 * Like in the previous game "card" is used as a state for guessing the card.
 * In the "draw" state, the user is given a random card from a random category to draw. The timer works the same for the computer as for the user guessing.
 * If the the user guesses the right drawing, it's a win because it's a good guess. If the computer guesses the drawing, it's also a win because it was a
 * nice drawing, so it's a win-win lose-lose game :).
 * The code for the title colors was based on this thread answer by Rabbid76: https://stackoverflow.com/questions/52614829/p5-js-change-text-color-in-for-a-single-word-in-a-sentence
 * The code for the confetti was addapted from slow_izzm's code: https://editor.p5js.org/slow_izzm/sketches/H1fhGJSaX
 * The code for the drawing was adapted from the sketch by Daniel Shiffman: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY
 * 
 */

"use strict";

//variable for states
let state = `home`;

// variables for classes
let home;
let guess;
let card;
let sketch;
let confetti = [];
let animateRandom = false;

// setting an array of colours for the confetti
let confettiColor = [];

// used to store the category number
let chosenCategory;
// variable to store the card selected
let cardNumber;
// for the card numbers
let cards = [`pineapple`,`lock`,`keyboard`,`italy`,`platypus`,`the rock`,`up`,`ocean's eleven`,`midnight in paris`];

// variable to determine if a category has been selected
let cardDrawn = false;

// boolean to determine if the user's answer is right
let rightCard = false;

// array for the videos
let video = [];

// countdown timer variables
let cardTimer = 63;
let startTimer = 3;
// variable to add 3 seconds at the end of the card timer
let mappedTimer;

//variables for the sounds
let failSound;
let cheer;

// constant for the speech recognition
const speechRecognizer = new p5.SpeechRec();

//constant for doodle identifier
let intelCanvas;
let doodleClassifier;
let currentPath;

// timer for drawing
let drawTimer = 63;

// speech for the computer to guess the drawing
let computer = new p5.Speech();
let speechplaying = 0;
let currentGuess;
let previousGuess;
let rightGuess = false;

// same as for guessing but for drawing
let guessCards = [`pineapple`,`bicycle`,`calculator`,`beach`,`panda`,`mona lisa`,`twister`,`the little mermaid`,`the lion king`];
let guessCategory;
// to select one of the cards at random
let userCard;


/**
 * Loads a few sounds
*/
function preload() {
    cheer = loadSound(`assets/sounds/yay.wav`);
    failSound = loadSound(`assets/sounds/wrong.wav`);
}


/**
 * Initiates speech recognition, sets font parameters
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // loading videos
    for (let i = 0; i < cards.length; i++) {
        let loadedVideo = createVideo(`assets/videos/card_${i}.webm`);
            video.push(loadedVideo);
            loadedVideo.hide();
        }
    
        // starts speech recording
    speechRecognizer.continuous = true;
    speechRecognizer.start();
        
    // font to be used in the whole game
    textFont("Comic Sans MS"); // I know, yes, comic sans :)
    // all text will be aligned to center
    textAlign(CENTER,CENTER);
    
    // declaring the classes to used in draw
    home = new Home();
    guess = new Guess();
    card = new Card();

        //canvas for the doodle classifier
    intelCanvas = createGraphics(windowWidth/5*4, windowHeight/3*2);
    intelCanvas.background(255);

    doodleClassifier = ml5.imageClassifier(`DoodleNet`, modelReady);
    doodleClassifier.classify(intelCanvas, handleResult);

    sketch = new Sketch(width/2,height/2);
    
    //sets the confetti to be used if win
    confettiColor = [color(0,174,239), color(236,0,140), color(114,200,182)];
    for (let i = 0; i < 100; i++) {
        confetti[i] = new Confetti(random(0, width), random(-height, 0), random(-1, 1));
    }
}
    
/**
 * Displays the states
*/    
function draw() {
    background(255);
    
    // draw the states
    if (state === `start`) {
        // displays the word "speech" and the instructions
        fill(0);
        textSize(80);
        text(`press SPACE to begin`,width/2,height/2);
    }
    else if (state === `home`) {
        home.displayTitle();
        home.displayCards();
        home.handleInputAnimations();
    }
    else if (state === `guess`) {
        guess.displayTitle();
        guess.displayCards();
        guess.categoryWheel();
        guess.handleSpeechInput();
    }
    else if (state === `card`) {
        card.displayInput();
        card.displayVideo();
        card.displayTimer();
        card.handleSpeechInput();
    }    
    else if (state === `sketch`) {
        sketch.displayBoard();
        sketch.displayButtons();
        sketch.handleInput();
        sketch.displayCard();
        sketch.displayTimer();
    }    
    
    // confetti drops if win, yay!
    if (rightCard === true && state === `card`) {
        for (let i = 0; i < confetti.length; i++) {
            confetti[i].displayConfetti();
            if (confetti[i] >= height*1.5) {
                confetti.length = 0;
            }
        }
    }
    // made a second one for the sketch
    if (rightGuess === true && state === `sketch`) {
        for (let i = 0; i < confetti.length; i++) {
            confetti[i].displayConfetti();
            if (confetti[i] >= height*1.5) {
                confetti.length = 0;
            }
        }
    }
}

function modelReady() {
    console.log(`model loaded`); // following ML5 instructions
  } 

// This is for the doodle identifier, I was not able to move this into the class
function handleResult(error, results) {
     //  for debugging
    if (error) {
      console.error(error)
      return;
    }
    // console.log(results[0].label,100*results[0].confidence);
    
    // getting results from the graphic
    if (rightGuess === false) {
    doodleClassifier.classify(intelCanvas, handleResult); 
    currentGuess = results[0].label.replace('_', ' '); // removing unwanted characters
    }
    // changing initial strings to show nothing
    if (results[0].label === `line` || results[0].label.match("object")) {
      currentGuess = ``;
    }
    // changing some of the string results to match the cards
    if (guessCategory === `movie`) {
        if (results[0].label.match("hurricane") ||
            results[0].label.match("tornado")) {
            currentGuess = `twister`;
        }
      else if (results[0].label.match("mermaid")) {
              currentGuess = `the little mermaid`;
          }
      else if (results[0].label.match("lion")) {
              currentGuess = `the lion king`;
          }
    }
    else if (results[0].label.match("Mona_Lisa")) {
            currentGuess = `mona lisa`;
    }
    // to sort the category
    if (userCard >= 0 && userCard <= 2) {
            guessCategory = `object`;
        }
    else if (userCard >= 3 && userCard <= 5) {
            guessCategory = `person/place/animal`;
        }
    else if (userCard >= 6 && userCard <= 8) {
            guessCategory = `movie`;
        }
  }
  
  function mousePressed() {
    if (state === `home`) {
        home.mousePressed();
    }
    if (state === `sketch`) {
        sketch.mousePressed();
    }
}

  // sais the guessed drawing
function mouseReleased() {
    if (state === `sketch`) {
        if (currentGuess != previousGuess && // only when the string is different from the previous one
          rightGuess === false) {
          computer.speak(currentGuess);
          previousGuess = currentGuess;
        }
    }
  }