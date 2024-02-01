

"use strict";


let currentAnimal = ``;
let currentAnswer = ``;

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

function setup() {
    createCanvas(501, 500);
    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();
}


function draw() {
    background(200);


    if (currentAnswer === currentAnimal) {
        fill(50, 200, 50);
    }
    else {
        fill(200, 50, 50);
    }
    textSize(32);
    textAlign(CENTER,CENTER);
    text(currentAnswer, width / 2, height / 2);
    text(currentAnimal, width / 2, height / 3);
}

function mousePressed() {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    speechSynthesizer.speak(reverseAnimal);
}

function handleSpeechInput() {
    let guessedAnimal = `What???`;
    if (speechRecognizer.resultValue) {
        let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
        let parts = lowerCaseResult.split(`i think it is `);
        if (parts.length > 1) {
            guessedAnimal = parts[1];
        }
    }
    currentAnswer = guessedAnimal;
    console.log(currentAnswer);
}

function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split(``);
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join(``);
    // Return the result
    return result;
  }