class Input {
    constructor() {
        this.framesLeft;
        this.inputDir;

        this.update(0, createVector(0, 0));
    }

    update(frames, dir) {
        this.framesLeft = frames;
        this.inputDir = dir.copy();
    }

    dirTranslate() {
        let dir = this.inputDir;
        if (dir.x == 0) {
            if (dir.y == 1) {
                return "DOWN";
            } else {
                return "UP";
            }
        } else if (dir.x == -1) {
            return "LEFT";
        } else {
            return "RIGHT";
        }
    }
}

class InputBuffer {
    constructor() {
        this.buffer = new Array(0);
    }

    addInput(frames, dir) {
        let size = this.buffer.length;

        if (size < 5) {
            this.buffer.push(new Input());
            this.buffer[size].update(frames, dir);
        }
    }

    update() {
        let newDir;
        let size = this.buffer.length;
        if (size == 0) {
            return null;
        }

        for (let element of this.buffer) {
            element.framesLeft--;
        }

        if (this.buffer[0].framesLeft == 0) {
            newDir = this.buffer[0].inputDir;
            let temp = this.buffer.shift();
        }

        return newDir;
    }

    clear() {
        if (this.buffer.length == 0) {
            return false;
        }
        this.buffer.length = 0;

        return true;
    }

    showBufferedInputs() {
        str = "";
        for (let element of this.buffer) {
            if (element) {
                str += element.dirTranslate() + " ";
            } else {
                break;
            }
        }

        return str;
    }
}

class Game {
    constructor(xpos, ypos) {
        //game objects
        this.snake = new Snake(xpos, ypos);
        this.dir = createVector(0, 1);
        this.food = this.spawnFood();

        //buffers
        this.inputBuffer = new InputBuffer();
        this.dirBuffer = this.dir.copy();

        //frame delay variables
        this.frameDelayBase = 1;
        this.frameDelay = this.frameDelayBase;
        this.frameDelayMax = 5;
        this.frameDelayOffset = 5;

        //frame rate variables
        this.frameRateBase = 5;
        this.frameRate = this.frameDelayBase;
        this.frameRateMax = 20;
        this.frameRateOffset = 8;
    }

    bailOut() {
        let cleared = this.inputBuffer.clear();

        if (cleared) {
            this.frameDelayBase++;
        }
    }

    updateDirBuffer(newDir) {
        this.dirBuffer = newDir;
    }

    getStats() {
        return `Frame Time: ${1000 / this.frameRate}ms Frame Delay: ${this.frameDelay} frames`;
    }

    updateTimings() {
        this.frameRate = this.frameRateBase + floor(this.snake.size() / this.frameRateOffset);
        this.frameRate = Math.min(this.frameRate, this.frameRateMax);

        this.frameDelay = this.frameDelayBase + floor(this.snake.size() / this.frameDelayOffset);
        this.frameDelay = Math.min(this.frameDelay, this.frameDelayMax);
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

        if (this.dirBuffer) {
            this.inputBuffer.addInput(this.frameDelay, this.dirBuffer);
            this.dirBuffer = null;
        }

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

        this.updateTimings();
    }
}
