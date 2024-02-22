/**

Experiment with ML5 and Doodlenet
based on Daniel Schiffman's DoodleNet Mouse: https://editor.p5js.org/codingtrain/sketches/6LLnGY1VY

*/

"use strict";

let clearButton;
let canvas;

let doodleClassifier;
let resultsDiv;

let drawing;

/**

*/
function setup() {
  createCanvas(windowsWidth, windowsHewight);
  // canvas = createCanvas(500, 500);
  // clearButton = createButton(`clear`);
  // clearButton.mousePressed(clearCanvas);
  

  // doodleClassifier = ml5.imageClassifier(`DoodleNet`, modelReady);
  // resultsDiv = createDiv('model loading');

  drawing = new Drawing(width/2,height/2);
}

function modelReady() {
  console.log(`model loaded`);
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error)
    return;
  }
  // console.log(results);
  let content = `${results[0].label}
                ${nf(100*results[0].confidence, 2, 1)}%<br/>
                ${results[1].label}
                ${nf(100*results[1].confidence, 2, 1)}%`;

  resultsDiv.html(content);
  doodleClassifier.classify(canvas, gotResults);
}


function clearCanvas() {
  background(255);
}
/**

*/
function draw() {
  background(255);

  drawing.displayBoard();
  drawing.displayButtons();
  
  if (mouseIsPressed) {
    strokeWeight(10);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}