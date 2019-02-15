// JavaScript source code
let pipesTop = [];
let pipesBot = [];
function setup() {
    createCanvas(600, 600);
    pipe = new Pipe();
}

class Pipe {
    constructor(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
    }

    display() {
        for (var i = 0; i < pipesTop.length; i++) {
            rect(pipesTop[i].x, pipesTop[i].y, 80, pipesTop[i].height);
            rect(pipesBot[i].x, pipesBot[i].y, 80, -pipesBot[i].height);
            pipesTop[i].x -= 1;
            pipesBot[i].x -= 1;
        }
    }
};
for (var i = 0; i < 25; i++) {
    let height = Math.floor(Math.random() * 400),
        newPipe = new Pipe(i * 200 + 560, -10, height);
    pipesTop.push(newPipe);
    pipesBot.push(new Pipe(i * 200 + 560, 600, 610 - (height + 100)));
}

function draw() {
    background(173, 216, 230);
    fill(152, 251, 152);
    pipe.display();
} 