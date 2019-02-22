// Global variables
let pipes = [],
    stars = [];
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
    // Creates the pipes
    for (var i = 0; i < 5; i++) {
        let height = pipeHeight();
        pipes.push(new pipe(i * 200 + 560, -10, height));
    }
    // Creates the stars
    for (var i = 0; i < 7; i++) {
        let starX = (i * 75) + 50;
        let starY = Math.floor(Math.random() * (300 - 75) + 75);
        stars.push(new star(starX, starY));
    }
}
// Continually draws objects on screen
function draw() {
    background(9, 135, 147);
    fill(219, 218, 146);
    rect(-2, 540, width + 4, 62);
    // Draws the grass
    for (var i = 0, l = groundXs.length; i < l; i++) {
        noStroke();
        fill(106, 175, 106);
        rect(groundXs[i], 544, 40, 20);
        groundXs[i] -= 2;
        groundXs[i] <= -40 ? groundXs[i] = width : groundXs[i];
    }
    // Draws the stars
    for (let star of stars) {
        star.display();
    }
    // Draws the pipes
    for (let pipe of pipes) {
        pipe.display();
    }
}
// Creates the ground objects
let groundXs = [];
for (var i = 0; i < 16; i++) {
    groundXs.push(i * 40);
}
// Creates the pipe objects
function pipe(posX, posY, height) {
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.display = function () {
        strokeWeight(2);
        stroke(90, 68, 72);
        fill(129, 208, 58);
        // Top pipe and pipe head
        rect(this.posX, this.posY, 70, this.height);
        rect(this.posX - 3, (this.posY + this.height), 76, 20);
        // Bottom pipe and pipe head
        rect(this.posX, this.posY + (this.height + 160), 70, 540 - (this.height) - 150);
        rect(this.posX - 3, this.height + 130, 76, 20);
        // Pipe wraparound
        this.posX -= 2;
        if (this.posX <= -200) {
            this.posX = width + 200;
            this.height = pipeHeight();
        }
    }
}
// Creates pretty twinkling stars
function star(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.display = function () {
        stroke(144, 237, 218);
        point(this.posX, this.posY);
        point(this.posX - 1, this.posY + 1);
        point(this.posX, this.posY + 1);
        point(this.posX + 1, this.posY + 1);
        point(this.posX, this.posY + 2);
    }
}
//Calculates the height of the pipes
function pipeHeight() {
    return Math.floor(Math.random() * (380 - 20) + 20);
}