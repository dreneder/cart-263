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

let category = [`objet`,`person`,`place`,`animal`,`movie`,`all play`];

let chosenCategory;

let cardPicked = false;

let rightCard = false;


let videos = [];
let numVideos = 9;

let cards = [`pinapple`,`lock`,`keyboard`,`italy`,`platypus`,`the rock`,`up`,`ocean's eleven`,`midnight in paris`];

let timer = 60;

let video;


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
    for (let i = 0; i < numVideos; i++) {
        video = createVideo(`assets/videos/card_${i}.webm`);
            videos.push(video);
        video.hide();
        video.play();
        }
        speechRecognizer.continuous = true;
        // speechRecognizer.onResult = handleSpeechInput;
        speechRecognizer.start();
        
        // font to be used in the whole game
        textFont("Comic Sans MS"); // I know, yes, comic sans :)
        // all text will be aligned to center
        textAlign(CENTER,CENTER);
        
        home = new Home();
    }
    
    
    function draw() {
        background(255);
        
        

        // //display the timer
        // fill(0);
        // textSize(50);
        // text(timer,width/2,height-150);

        // //displays the video
        // imageMode(CENTER);
        // // image(videos[1],width/2,height/2,width/1.5,height/2);
        // // pauses the video when it reaches the end
        // if (videos[1].time() >= videos[1].duration()) {
        //     videos[1].pause();
        // }

        
    //display the title at the colour red or green according to the answer
    if (rightCard = false) {
        fill(0,255,0);
    }
    else {
        fill(255,0,0);
    }

    text(speechRecognizer.resultString,width/2,150); // disply card title

    //start the timer once a card is drawn
    if (state === `card` && frameCount % 60) {
        timer--;
    }
    // returns to home if timer reaches 0
    if (timer <= 0) {
        timer = 0;
    }



    // home.displayTitle();
    // home.displayCards();

    
    console.log(cardPicked);
    



}

function handleSpeechInput() {
        if (speechRecognizer.resultValue) {
        let lowerCaseResult = speechRecognizer.resultString.toLowerCase();

        if (category.includes(lowerCaseResult)) {
            speechRecognizer.onResult;
            cardPicked = true;
        }
    // if (lowerCaseResult.includes(category[i])) {
    //     cardPicked = true;
    // }
    }


}
function categoriesWheel() {
    if (chosenCategory === `allPlay`) {
        category = random(3);
    }
    else if (chosenCategory === `objects`) {
        objects = random(3);
    }
    else if (chosenCategory === `ppa`) {
        ppa = random(3);
    }
    else if (chosenCategory === `movie`) {
        movie = random(3);
    }
}
