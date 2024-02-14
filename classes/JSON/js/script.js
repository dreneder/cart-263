let jokeText = ``; // The current joke.
let jokeData = undefined; // The loaded joke data

function preload() {
  jokeData = loadJSON(`https://official-joke-api.appspot.com/jokes/programming/random`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // We get the joke object as the first element of the array
  let joke = jokeData[0];
  // Set the joke text as the setup and punchline properties together
  jokeText = `${joke.setup}\n\n${joke.punchline}`;
}

function draw() {
  background(0);

  // Display the current joke
  push();
  fill(255, 255, 0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(jokeText, width / 2, height / 2);
  pop();
}










// first part
// "use strict";


// let tarotData = undefined;
// let fortune = `No fortune found yet...`;

// // function preload() {
// //     tarotData = loadJSON(`assets/data/tarot_interpretations.json`);
// // }

// function setup() {
//     createCanvas(windowWidth,windowHeight);
// }


// function draw() {
//     background(255);

//     // access an specific data in the array
//     // let firstShadowMeaning = tarotData.tarot_interpretations[0].meanings.shadow[0];

//     push();
//     textSize(32);
//     textAlign(CENTER);
//     fill(0);
//     text(fortune, width/2, height/2);
//     pop();
// }

// function mousePressed() {
//     loadJSON(`assets/data/tarot_interpretations.json`,tarotLoaded);
// }

// function tarotLoaded(data) {
//     tarotData = data;
//     let card = random(tarotData.tarot_interpretations);
//     fortune = random(card.fortune_telling);
// }