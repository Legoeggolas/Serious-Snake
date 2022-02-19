let game, div, menuButtons, scoreButtons, currScreen;

//identifiers for different game screens
const MENU = 0,
    NG = 1,
    GOVER = 2,
    HS = 3;

function setup() {
    let canvas = createCanvas(1280, 600);
    canvas.parent("p5sketch");
    game = new Game(40, 40);
    div = createDiv().size(800, 125);
    menuButtons = [
        new Button(width / 2, (1 * height) / 3, 210, 100, "New Game", () => NG),
        new Button(width / 2, (2 * height) / 3, 210, 100, "Highscores", () => HS),
    ];
    scoreButtons = [new Button(width / 2, (6 * height) / 7, 100, 60, "Back", () => MENU)];
    currScreen = MENU;
}

//renders the main menu
function menu() {
    for (let button of menuButtons) {
        button.draw();
    }
}

//renders the high scores
function highScores() {
    /*fetch and list high scores


    */
    for (let button of scoreButtons) {
        button.draw();
    }
}

//renders the game over transition state
function gameOver() {
    strokeWeight(2);
    textFont("Verdana");
    textSize(64);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
}

//render the entirety of the game
function draw() {
    frameRate(60);
    background(0, 0, 0);
    fill(230, 230, 250);
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(5);
    rect(width / 2, height / 2, width - 40, height - 40);

    //select which screen to render
    if (currScreen == MENU) {
        if (game.gameOver) {
            game = new Game(40, 40);
        }
        menu();
    } else if (currScreen == NG) {
        game.draw();

        if (game.gameOver) {
            currScreen = GOVER;
            setTimeout(() => {
                currScreen = HS;
                console.log("runs");
            }, 4500);
        }
    } else if (currScreen == GOVER) {
        gameOver();
    } else {
        highScores();
    }

    //div.html(`<p>${game.getStats()} Buffer: ${game.inputBuffer.showBufferedInputs()}</p>`);
}

//handle key presses
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

//handles mouse clicks
function mouseClicked() {
    let listRef;
    if (currScreen == MENU) {
        listRef = menuButtons;
    } else {
        listRef = scoreButtons;
    }

    for (let button of listRef) {
        if (button.isSelected()) {
            currScreen = button.onClick();
            return;
        }
    }
}
