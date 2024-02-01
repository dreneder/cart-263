

"use strict";

const speechSynthesizer = new p5.Speech();

let showSubtitle = false;
let toSay = `I'm crawling through the air condicioning vents`



function setup() {
    createCanvas(500,500);
    
    //Synthesis settings
    speechSynthesizer.setPitch(1);
    speechSynthesizer.setRate(1);
    speechSynthesizer.setVoice(`Google UK English Male`);

    speechSynthesizer.onStart = speechStarted;
    speechSynthesizer.onEnd = speechEnded;

    console.log(speechSynthesizer.listVoices());
}


function draw() {
    background(227, 127, 111);

    if (showSubtitle) {
        text(toSay, 100, 100);
    }
}

function mousePressed() {
    speechSynthesizer.speak(toSay);
}

function speechStarted() {
    showSubtitle = true;
}

function speechEnded() {
    showSubtitle = false;
}