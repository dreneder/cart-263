/**

Experiment with ML5 and Doodlenet
based on Daniel Schiffman's DoodleNet Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY

*/

"use strict";

let clearButton;
let intelCanvas;

let doodleClassifier;
let guess;

let drawing;

let currentPath;
let isDrawing = false;

let content;

let userCard;



/**

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //canvas for the doodle classifier
  intelCanvas = createGraphics(windowWidth/5*4, windowHeight/3*2);
  intelCanvas.background(255);

  doodleClassifier = ml5.imageClassifier(`DoodleNet`, modelReady);
  guess = text('model loading',);

  drawing = new Drawing(width/2,height/2);

      // font to be used in the whole game
      textFont("Comic Sans MS"); // I know, yes, comic sans :)
      // all text will be aligned to center
      textAlign(CENTER,CENTER);
      background(255);
      
      doodleClassifier.classify(intelCanvas, handleResult);
    }
    
    function modelReady() {
      console.log(`model loaded`);
    }
    
    function handleResult(error, results) {
      if (error) {
        console.error(error)
        return;
      }
      content = results[0].label;
      // console.log(results[0].label,100*results[0].confidence);
      doodleClassifier.classify(intelCanvas, handleResult);

      if (results[0] === `line`) {

      }      
      if (results[0] === userCard) {
        
      }      
    }
    
    /**
     
    */
   function draw() {
     background(255);
     
     drawing.displayBoard();
     drawing.displayButtons();
     drawing.handleInput();
     textAlign(CENTER,CENTER);
     fill(0);
     textSize(30);
     text(content,100,100);
    }