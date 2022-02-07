let snake, food, dir;

function spawnFood() {
    let xpos = floor(random(2, (width - 20) / 20)) * 20;
    let ypos = floor(random(2, (height - 20) / 20)) * 20;

    while (snake.isOnSnake(createVector(xpos, ypos)) != 0) {
        xpos = floor(random(2, (width - 20) / 20)) * 20;
        ypos = floor(random(2, (height - 20) / 20)) * 20;
    }

    return new Part(xpos, ypos, color(128, 128, 128));
}

function setup() {
    createCanvas(1280, 600);
    snake = new Snake(40, 40);
    food = spawnFood();
    dir = createVector(0, 1);
}

function draw() {
    frameRate(10 + snake.size());
    background(255, 255, 255);
    fill(230, 230, 250);
    rectMode(CENTER);
    stroke(0, 0, 0);
    strokeWeight(5);
    rect(width / 2, height / 2, width - 40, height - 40);

    strokeWeight(1);

    let eaten = snake.canEat(food.pos);

    snake.draw();
    snake.updateDir(dir);
    snake.updatePos(eaten);

    if (eaten) {
        food = spawnFood();
    }
    food.draw();

    snakePos = snake.getPos();

    if (
        snakePos.x == width - 20 ||
        snakePos.x == 20 ||
        snakePos.y == height - 20 ||
        snakePos.y == 20
    ) {
        snake.mark(0, color(255, 30, 30));
        snake.updateDir(createVector(0, 0));
    }

    let hitItself = snake.isOnSnake(snakePos, true);
    if (hitItself != 0) {
        snake.mark(hitItself, color(255, 30, 30));
        snake.updateDir(createVector(0, 0));
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        dir = createVector(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        dir = createVector(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        dir = createVector(-1, 0);
    } else {
        dir = createVector(1, 0);
    }
}
