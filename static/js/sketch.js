let game, div;

function setup() {
    createCanvas(1280, 600);
    game = new Game(40, 40);
    div = createDiv().size(800, 125);
}

function draw() {
    game.draw();
    div.html(`<p>${game.getStats()} Buffer: ${game.inputBuffer.showBufferedInputs()}</p>`);
}

function keyPressed() {
    if (keyCode == 32) {
        game.bailOut();
        return;
    }

    let dir;
    if (keyCode === UP_ARROW) {
        dir = createVector(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        dir = createVector(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        dir = createVector(-1, 0);
    } else {
        dir = createVector(1, 0);
    }

    game.updateDirBuffer(dir);
}
