// Global variables
let pipes = [];
const X_AXIS = 2;
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
    noStroke();
    darkPipeColor = color(82, 128, 32);
    lightPipeColor = color(216, 241, 123);
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
        groundXs[i] <= -40 ? groundXs[i] = width : groundXs[i];
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
        rect(this.posX - 3, this.height - 10, 76, 20);
        // Bottom pipe and pipe head
        rect(this.posX, this.posY + (this.height + 160), 70, 540 - (this.height) - 150);
        rect(this.posX - 3, this.height + 130, 76, 20);
        this.shade(this.posX, this.posY, this.height);
        // Pipe wraparound
        this.posX -= 1;
        if (this.posX <= -200) {
            this.posX = width + 200;
            this.height = Math.floor(Math.random() * 390)
        }
    }
    // Shades the pipes
    this.shade = function (x, y, height) {
        let botPipeStart = this.height + 153,
            botPipeLength = 540 - this.height - 154;
        noStroke();
        // Pipe bodies - DARK
        fill(76, 132, 25);
        rect(x + 59, y, 10, height - 3);
        rect(x + 59, botPipeStart, 10, botPipeLength);
        
        rect(x + 53, y, 3, height - 3);
        rect(x + 53, botPipeStart, 3, botPipeLength);

        rect(x + 1, y + this.height - 3, 68, 2);
        rect(x + 1, botPipeStart - 2, 68, 2);
        // Pipe bodies - LIGHT
        fill(203, 245, 122);
        rect(x + 20, y, 3, height - 3);
        rect(x + 20, botPipeStart, 2, botPipeLength);

        rect(x + 4, y, 5, height - 3);
        rect(x + 4, botPipeStart, 5, botPipeLength);

        // Pipe heads - DARK
        fill(76, 132, 25);
        rect(x + 62, height - 9, 10, 18);
        rect(x + 62, botPipeStart - 22, 10, 18);

        rect(x + 56, height - 9, 3, 18);
        rect(x + 56, botPipeStart - 22, 3, 18);

        // Pipe heads - LIGHT
        fill(203, 245, 122);
        rect(x + 17, height - 9, 3, 18);
        rect(x + 17, botPipeStart - 22, 3, 18);

        rect(x + 11, height - 9, 2, 18);
        rect(x + 11, botPipeStart - 22, 2, 18);

        rect(x, height - 9, 5, 18);
        rect(x, botPipeStart - 22, 5, 18);
    }
}