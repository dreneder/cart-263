/**

Experiment with ML5 and Doodlenet
based on Daniel Schiffman's DoodleNet Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY

*/

"use strict";



let intelCanvas;
let doodleClassifier;
let guess;
let previousGuess;
let rightGuess = false;

let drawTimer = 63;

let userCard = `bicycle`;

let mappedTimer;

let sketch;

let currentPath;

let content;

// for the card numbers
let guessCards = [`pineapple`,`bicycle`,`calculator`,`beach`,`panda`,`mona lisa`,`twister`,`the little mermaid`,`the lion king`];

let guessCategory = [`object`,`person / place/ animal`,`movie`,`all play`]

let computer = new p5.Speech();

let speechplaying = 0;


/**

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //canvas for the doodle classifier
  intelCanvas = createGraphics(windowWidth/5*4, windowHeight/3*2);
  intelCanvas.background(255);

  doodleClassifier = ml5.imageClassifier(`DoodleNet`, modelReady);
  doodleClassifier.classify(intelCanvas, handleResult);

  sketch = new Drawing(width/2,height/2);

  // font to be used in the whole game
  textFont("Comic Sans MS"); // I know, yes, comic sans :)
  // all text will be aligned to center
  textAlign(CENTER,CENTER);      
}
    
function modelReady() {
  console.log(`model loaded`); // following ML5 instructions
} 
    
function handleResult(error, results) {
   //  for debugging
  if (error) {
    console.error(error)
    return;
  }
  // console.log(results[0].label,100*results[0].confidence);
  
  // getting results from the graphic
  doodleClassifier.classify(intelCanvas, handleResult); 
  currentGuess = results[0].label.replace('_', ' '); // removing unwanted characters
  // changing initial strings to show nothing
  if (results[0].label === `line` || results[0].label.match("object")) {
    currentGuess = ``;
  }
  // changing some of the string results to match the cards
  else if (guessCategory === `movies`) {
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
}
    
    /**
     
    */
function draw() {
   background(255);  
     
    sketch.displayBoard();
    sketch.displayButtons();
    sketch.handleInput();
    sketch.displayCard();
    sketch.displayTimer();
}
// sais the guessed drawing
function mouseReleased() {
  if (currentGuess != previousGuess &&
    state === `sketch` &&
    rightGuess === false) {
    computer.speak(currentGuess);
    previousGuess = currentGuess;
  }
}