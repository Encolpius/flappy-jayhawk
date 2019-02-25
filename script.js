// Global variables
let pipes = [],
    stars = [],
    largeStars = [];
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
    // Creates the pipes
    for (var i = 0; i < 5; i++) {
        let height = pipeHeight();
        pipes.push(new pipe(i * 200 + 600, -10, height));
    }
    // Creates the stars
    for (var i = 0; i < 15; i++) {
        let starX = (i * 40) + 40;
        let starY = Math.floor(Math.random() * (250 - 30) + 30);
        if (i % 4 == 0) {
            largeStars.push(new star(starX, starY));
        } else {
            stars.push(new star(starX, starY));
        }
    }
}
// Continually draws objects on screen
function draw() {
    background(9, 135, 147);
    // Draws the stars
    for (let star of stars) {
        star.displaySmall();
    }
    for (let star of largeStars) {
        star.displayLarge();
    }
    // Draws the pipes
    for (let pipe of pipes) {
        pipe.display();
    }
    fill(225, 218, 158);
    rect(-2, 540, width + 4, 62);
    noStroke();
    // Draws the grass
    for (var i = 0, l = groundXs.length; i < l; i++) {
        fill(156, 231, 90);
        rect(groundXs[i], 543, 50, 26);
        for (let j = 0; j < 25; j += 2) {
            stroke(119, 192, 51);
            strokeWeight(2);
            line((groundXs[i] - j) + 25, 544 + j, (groundXs[i] - j) + 45, 544 + j)
        }
        groundXs[i] -= 2;
        groundXs[i] <= -50 ? groundXs[i] = width : groundXs[i];
        noStroke();
    }
    stroke(80, 127, 44);
    line(0, 570, width, 570);
    stroke(221, 169, 90);
    line(0, 572, width, 572);
}
// Creates the ground objects
let groundXs = [];
for (var i = 0; i < 16; i++) {
    groundXs.push(i * 50);
}
// Creates the pipe objects
function pipe(posX, posY, height) {
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.display = function () {
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
    this.displaySmall = function () {
        stroke(255);
        rect(this.posX, this.posY, 2, 2);
    }
    this.displayLarge = function () {
        stroke(254, 241, 0);
        rect(this.posX, this.posY, 2, 8);
        rect(this.posX - 3, this.posY + 3, 8, 2);
    }
}
//Calculates the height of the pipes
function pipeHeight() {
    return Math.floor(Math.random() * (380 - 20) + 20);
}