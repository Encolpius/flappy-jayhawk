// JavaScript source code
// Global variables
let pipes = [],
    directions = ["up", "down"];
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
}
// Continually draws objects on screen
function draw() {
    background(9, 135, 147);
    fill(221, 217, 139);
    rect(-1, 557, width + 1, 50);
    stroke(25, 25, 25);
    // Draws the ground objects
    for (var i = 0, l = groundXs.length; i < l; i++) {
        noStroke();
        fill(145, 222, 56);
        rect(groundXs[i], 540, 50, 26);
        for (let j = 0; j < 25; j+=2) {
            stroke(119, 192, 51);
            strokeWeight(2)
            line((groundXs[i] - j) + 25, 541 + j, (groundXs[i] - j) + 45, 541 + j)
        }
        // groundXs[i] -= 1;
        groundXs[i] <= -40 ? groundXs[i] = width : groundXs[i];
    }
}
// Creates the ground objects
let groundXs = [];
for (var i = 0; i < 16; i++) {
    groundXs.push(i * 50);
}