/**
 * Speech Pictionary
 * André Neder
 * 
 * The Speech Pictionary is my attempt to replicate the game Pictionary with P5 and P5 Speech.
 * The whole game is divided in two states: home and card. When the user is in "home" the speech recognizer allows
 * for a category to be chosen. There are three categories: Object, Person/Place/Animal and Movie, and an All Play
 * category that picks a random card from all the other three.
 * My approach to make the drawings was to draw them with a pen on an iPad and record it. The video is them cropped
 * trimmed, and exported in webm format. The createVideo function is used to display it.
 * The user has one minute to guess the drawing, the videos finish with between 30 and 40 seconds.
 * The code for the title colors was based on this thread answer by Rabbid76: https://stackoverflow.com/questions/52614829/p5-js-change-text-color-in-for-a-single-word-in-a-sentence
 * 
 */

"use strict";


let state = `home`;

let home;
let card;

let category = [`objet`,`person`,`place`,`animal`,`movie`,`all play`];

let chosenCategory;

let cardDrawn = false;

let rightCard = false;


let video = [];

let cardNumber;

let cards = [`pineapple`,`lock`,`keyboard`,`italy`,`platypus`,`the rock`,`up`,`ocean's eleven`,`midnight in paris`];

// countdown timer variables
let cardTimer = 63;
let startTimer = 3;
// variable to add 3 seconds at the end of the card timer
let mappedTimer;

// let loadedVideo;


const speechRecognizer = new p5.SpeechRec();

/**
 * Loads all the videos
*/
function preload() {
   
}

/**
 * Initiates speech recognition, sets font parameters
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // loading videos
    for (let i = 0; i < cards.length; i++) {
        let loadedVideo = createVideo(`assets/videos/card_${i}.webm`,`assets/videos/card_${i}.mp4`);
            video.push(loadedVideo);
            loadedVideo.hide();
            loadedVideo.play();
        }
        // starts speech recording
        speechRecognizer.continuous = true;
        speechRecognizer.start();
        
        // font to be used in the whole game
        textFont("Comic Sans MS"); // I know, yes, comic sans :)
        // all text will be aligned to center
        textAlign(CENTER,CENTER);
        
        home = new Home();
        card = new Card();

}
    
    
    function draw() {
        background(255);
        
        // draw the states
        if (state === `home`) {
            home.displayTitle();
            home.displayCards();
            home.categoryWheel();
            home.handleSpeechInput();
        }
        else if (state === `card`) {
            card.displayInput();
            card.displayVideo();
            card.displayTimer();
            card.handleSpeechInput();
        }
  
        console.log(video[cardNumber]); 
    

    



}



