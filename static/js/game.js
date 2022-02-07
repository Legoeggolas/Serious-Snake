class Input {
    constructor() {
        this.framesLeft;
        this.inputDir;

        this.update(0, createVector(0, 0));
    }

    update(frames, dir) {
        this.framesLeft = frames;
        this.inputDir = dir;
    }
}

class InputBuffer {
    constructor() {
        this.buffer = new Array(5).fill().map((e) => new Input());
    }

    addInput(frames, dir) {
        for (let input of this.buffer) {
            if (input.framesLeft <= 0) {
                input.update(frames, dir);
                break;
            }
        }
    }

    update() {
        let newDir;
        for (let input of this.buffer) {
            input.framesLeft--;
            if (input.framesLeft == 0) {
                newDir = input.inputDir;
            }
        }

        return newDir;
    }
}

class Game {
    constructor(xpos, ypos) {
        this.snake = new Snake(xpos, ypos);
        this.dir = createVector(0, 1);
        this.food = this.spawnFood();

        this.framesTillInput = 1;
        this.inputBuffer = new InputBuffer();
        this.dirBuffer = this.dir.copy();

        this.frameOffset = 10;
        this.frameRate = 10;
    }

    updateDirBuffer(newDir) {
        this.dirBuffer = newDir;
    }

    getStats() {
        return `Frame Time: ${1000 / this.frameRate}ms Frame Delay: ${this.framesTillInput} frames`;
    }

    spawnFood() {
        let xpos = floor(random(2, (width - 20) / 20)) * 20;
        let ypos = floor(random(2, (height - 20) / 20)) * 20;

        while (this.snake.isOnSnake(createVector(xpos, ypos)) != 0) {
            xpos = floor(random(2, (width - 20) / 20)) * 20;
            ypos = floor(random(2, (height - 20) / 20)) * 20;
        }

        return new Part(xpos, ypos, color(128, 128, 128));
    }

    draw() {
        frameRate(this.frameRate);
        background(255, 255, 255);
        fill(230, 230, 250);
        rectMode(CENTER);
        stroke(0, 0, 0);
        strokeWeight(5);
        rect(width / 2, height / 2, width - 40, height - 40);

        strokeWeight(1);

        let eaten = this.snake.canEat(this.food.pos);

        this.snake.draw();

        //check if input buffer has any updates
        let newDir = this.inputBuffer.update();
        if (newDir) {
            this.dir = newDir;
        }
        this.inputBuffer.addInput(this.framesTillInput, this.dirBuffer);

        this.snake.updateDir(this.dir);

        this.snake.updatePos(eaten);

        if (eaten) {
            this.food = this.spawnFood();
        }
        this.food.draw();

        let snakePos = this.snake.getPos();

        if (
            snakePos.x == width - 20 ||
            snakePos.x == 20 ||
            snakePos.y == height - 20 ||
            snakePos.y == 20
        ) {
            this.snake.mark(0, color(255, 30, 30));
            this.snake.updateDir(createVector(0, 0));
        }

        let hitItself = this.snake.isOnSnake(snakePos, true);
        if (hitItself != 0) {
            this.snake.mark(hitItself, color(255, 30, 30));
            this.snake.updateDir(createVector(0, 0));
        }

        this.frameRate = 10 + floor(this.snake.size() / 4);
        this.framesTillInput = 1 + floor(this.snake.size() / this.frameOffset);
    }
}
