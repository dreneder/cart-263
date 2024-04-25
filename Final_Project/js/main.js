/**
Metropolitan
André Neder

Metropolitan is rather an experiment and an experience than a game. It is my attempt to simulate 3D navigation using of
2D sprites.
*/

"use strict";

// Variables to hold references to the walls
let topWall, bottomWall, leftWall, rightWall;

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1000,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Play]
};

let game = new Phaser.Game(config);