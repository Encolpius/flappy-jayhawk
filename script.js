//// Global variables
"use strict"
let pipes = [],
    stars = [],
    grounds = [];
const JAYHAWK = new Jayhawk(200, 200, 0);
let instances = 0;
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
        let starX = (i * 35) + 35;
        let starY = Math.floor(Math.random() * (350 - 40) + 40);
        stars.push(new star(starX, starY));
    }
    // Creates the ground
    Array.from(Array(16)).forEach((x, i) => grounds.push(new ground(i * 50, 543)));
}
// Continually draws objects on screen
function draw() {
    background(9, 135, 147);
    // Draws the stars
    stars.forEach((x, i) => i % 4 == 0 ? x.displayLarge() : x.displaySmall());
    // Draws the pipes
    pipes.forEach(function (x) {
        x.display();
        JAYHAWK.checkIfTouchPipes(x); 
        JAYHAWK.x >= x.posX + 20 && JAYHAWK.x <= x.posX + 22 ? JAYHAWK.score = x.pipeNumber : false;
    });
    // First ground layer
    fill(225, 218, 158);
    rect(-2, 540, width + 4, 62);
    // Draws the grass blocks
    grounds.forEach(x => x.display());
    // Draws the Jayhawk
    JAYHAWK.display();
    // Ground shading
    stroke(80, 127, 44);
    line(0, 570, width, 570);
    stroke(221, 169, 90);
    line(0, 572, width, 572);
    // Draws the score
    textSize(30);
    fill(255);
    stroke(0);
    strokeWeight(4);    
    text(JAYHAWK.score, 290, 40);
}
// Creates the ground objects
function ground(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.display = function () {
        noStroke();
        fill(156, 231, 90);
        rect(this.posX, 543, 50, 26);
        for (let j = 0; j < 25; j += 2) {
            stroke(119, 192, 51);
            strokeWeight(2);
            line((this.posX - j) + 25, 544 + j, (this.posX - j) + 45, 544 + j)
        }
        this.posX -= 2;
        this.posX <= -50 ? this.posX = width : this.posX;
    }
}
// Creates the pipe objects
function pipe(posX, posY, height) {
    instances++;
    this.pipeNumber = instances;
    this.posX = posX;
    this.posY = posY;
    this.height = height;
    this.display = function () {
        stroke(90, 68, 72);
        strokeWeight(2);
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
            this.pipeNumber += 5;
        }
    }
}
// Creates pretty twinkling stars
function star(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.displaySmall = function () {
        stroke(211, 217, 230);
        ellipse(this.posX, this.posY, 2, 2);
    }
    this.displayLarge = function () {
        stroke(254, 241, 0);
        strokeWeight(2);
        rect(this.posX, this.posY, 2, 8);
        rect(this.posX - 3, this.posY + 3, 8, 2);
    }
}
function Jayhawk(x, y, score) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.display = function () {
        noStroke();
        let jayhawkConstraints = constrain(JAYHAWK.y, 0, 500);
        rect(this.x, jayhawkConstraints, 40, 40);
        this.move();
    }
    // Controls Jayhawk movement
    this.up = function keyPressed(value) {
        value === 32 && this.y >= 0 ? this.y -= 2 : this.y;
    }
    this.down = function () {
        this.y <= 500 ? this.y += 3 : this.y;
    }
    this.checkIfTouchPipes = function (pipe) {
        // TOP PIPE
        if (((pipe.posX <= this.x + 40 && pipe.posX >= this.x - 70) &&
            (pipe.posY <= this.y && this.y <= pipe.height + 13)) ||
            // BOTTOM PIPE
            ((pipe.posX <= this.x + 40 && pipe.posX >= this.x - 70) &&
                (pipe.posY + pipe.height + 100 <= this.y))) {
            text("GAME OVER", 200, 200);
        }
    }
    this.move = function () {
        if (keyIsDown(65) && this.x > 0) {
            this.x -= 2;
        }
        if (keyIsDown(68) && this.x < 560) {
            this.x += 2;
        }
        if (keyIsDown(32) && this.y > 0) {
            this.y -= 2;
        } else if (this.y <= 500) {
            this.y += 2.5;
        }
    }
}
// Calculates the height of the pipes
let pipeHeight = () => Math.floor(Math.random() * (380 - 20) + 20);