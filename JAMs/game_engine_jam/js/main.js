/**
Invade Spacers
André Neder

It's like Space Invaders, but you're the bad guy (duh). The objective is to either destroy the attacker
ship by shooting at it or to arrive at the Y line to pass it
*/

"use strict";

let loseGame = false;
let winGame = false;

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Play, End]
};

let game = new Phaser.Game(config);