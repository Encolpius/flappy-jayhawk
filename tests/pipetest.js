// Global variables
let pipes = [],
    directions = ["up", "down"];
// Setup - called once when the page is loaded
function setup() {
    createCanvas(600, 600);
    for (var i = 0; i < 1; i++) {
        let height = Math.floor(Math.random() * (380 - 25) + 25),
            spaceBetween = 150,
            isMoving = false,
            direction = Math.round(Math.random());
        pipes.push(new pipe(300, -10, height, spaceBetween, isMoving, directions[direction]));
    }
}
// Continually draws objects on screen
function draw() {
    background(9, 135, 147);
    fill(221, 217, 139);
    rect(0, 557, width, 50);
    stroke(25, 25, 25);
    // Draws the ground objects
    for (var i = 0, l = groundXs.length; i < l; i++) {
        fill(145, 222, 56);
        rect(groundXs[i], 540, 40, 17);
        // groundXs[i] -= 1;
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
function pipe(posX, posY, height, spaceBetween, isMoving, direction) {
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.spaceBetween = spaceBetween;
    this.isMoving = isMoving;
    this.direction = direction;
    this.display = function () {
        // this.isMoving = true;
        this.isMoving == true ? this.moving(direction) : false;
        strokeWeight(2);
        stroke(90, 68, 72);
        fill(129, 208, 58);
        // Top pipe and pipe head
        rect(this.posX, this.posY, 70, this.height);
        rect(this.posX - 3, this.posY + this.height, 76, 20);
        // Bottom pipe and pipe head
        rect(this.posX, this.posY + (this.height + (spaceBetween + 10)), 70, 540 - this.height - spaceBetween);
        rect(this.posX - 3, (this.posY + 10) + this.height + (spaceBetween - 20), 76, 20);
        // this.shade(this.posX, this.posY, this.height);
        // Pipe wraparound
        // this.posX -= 1;
        if (this.posX <= -200) {
            this.posX = width + 200;
            this.height = Math.floor(Math.random() * 390)
        }
    }
    this.moving = function (direction) {
        if (this.direction == "up") {
            this.height -= 0.8;
            this.posY >= this.height - 40 ? this.direction = "down" : this.height;
        } else if (this.direction == "down") {
            this.height += 0.8;
            this.height >= this.posY + 350 ? this.direction = "up" : this.height;
        };
    }
}
    // Shades the pipes
/*
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

        rect(x + 12, height - 9, 2, 18);
        rect(x + 12, botPipeStart - 22, 2, 18);
        // Final shading
        rect(x, height - 9, 5, 18);
        rect(x, botPipeStart - 22, 5, 18);
    }
    */