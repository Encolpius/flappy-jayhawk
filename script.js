// Global variables
let pipes = [];
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
    noStroke();
    for (var i = 0; i < 5; i++) {
        let height = Math.floor(Math.random() * 390);
        pipes.push(new pipe(i * 200 + 560, -10, height));
    }
}
// Continually draws objects on screen
function draw() {
    background(173, 216, 230);
    fill(101, 67, 33);
    rect(0, 550, width, 50);
    stroke(25, 25, 25);
    // Draws the ground objects
    for (var i = 0, l = groundXs.length; i < l; i++) {
        fill(106, 175, 106);
        rect(groundXs[i], 540, 40, 10);
        groundXs[i] -= 1;
        if (groundXs[i] <= -40) {
            groundXs[i] = width;
        }
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
        rect(this.posX, this.posY, 80, this.height);
        rect(this.posX, this.posY + (this.height + 160), 80, 540 - (this.height) - 150);
        this.posX -= 1;
        if (this.posX <= -200) {
            this.posX = width + 200;
            this.height = Math.floor(Math.random() * 390)
        }
    }
}