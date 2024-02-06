

"use strict";


let state = `home`;

// let currentAnimal = ``;
// let currentAnswer = ``;

// const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

function setup() {
    createCanvas(windowWidth, windowHeight);
    // speechRecognizer.continuous = true;
    // speechRecognizer.onResult = handleSpeechInput;
    // speechRecognizer.start();
}


function draw() {
    background(255);



    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(width/2-200,height/2,350,150);
    rect(width/2+200,height/2,350,150);
    rect(width/2-200,height/2+200,350,150);
    rect(width/2+200,height/2+200,350,150);

    fill(255);
    textAlign(CENTER,CENTER);
    textSize(40);
    textFont("Comic Sans MS");
    text(`Object`,width/2-200,height/2);
    text(`Movie`,width/2-200,height/2+200);
    text(`All Play`,width/2+200,height/2+200);
    textSize(32);
    text(`Person/Place/Animal`,width/2+200,height/2);

    // if (currentAnswer === currentAnimal) {
    //     fill(50, 200, 50);
    // }
    // else {
    //     fill(200, 50, 50);
    // }
    // textSize(32);
    // textAlign(CENTER,CENTER);
    // text(currentAnswer, width / 2, height / 2);
    // text(currentAnimal, width / 2, height / 3);
}

// function mousePressed() {
//     currentAnimal = random(animals);
//     let reverseAnimal = reverseString(currentAnimal);
//     speechSynthesizer.speak(reverseAnimal);
// }

// function handleSpeechInput() {
//     let guessedAnimal = `What???`;
//     if (speechRecognizer.resultValue) {
//         let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
//         let parts = lowerCaseResult.split(`i think it is `);
//         if (parts.length > 1) {
//             guessedAnimal = parts[1];
//         }
//     }
//     currentAnswer = guessedAnimal;
//     console.log(currentAnswer);
// }
