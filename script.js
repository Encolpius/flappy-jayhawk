// JavaScript source code
function setup() {
    createCanvas(600, 600);
    stick = new Stick();
    ground = new Ground();
}

class Ground {
    display() {
        rect(0, 530, width, 70);
    }
}

let sticks = [];
class Stick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        for (var i = 0; i < sticks.length; i++) {
            rect(sticks[i].x, sticks[i].y, 15, 50);
            sticks[i].x -= 1;
        }
    }
};

function createStick () {
    for (var i = 0; i < 45; i++) {
        sticks.push(new Stick(i * Math.floor(Math.random() + 40) + 610, Math.floor(Math.random() * 450)));
    }
};
createStick();
console.log(sticks);

function draw() {
    background(173, 216, 230);
    fill(101, 67, 33)
    ground.display();
    stick.display();
}