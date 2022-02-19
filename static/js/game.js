//the game class handles user sessions
//any single instance is responsible for rendering and applying all game logic
class Game {
    constructor(xpos, ypos) {
        //game objects
        this.snake = new Snake(xpos, ypos);
        this.dir = createVector(0, 1); //the snake starts by moving in this direction by default
        this.food = this.spawnFood();

        //score
        this.score = 0;

        //buffers
        //the inputBuffer stores inputs that are then executed after a set delay
        //the dirBuffer stores a copy of user input which is used to update the inputBuffer each frame
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

        //game states
        this.gameOver = false;
        this.stopRendering = false;
    }

    //updates the score
    updateScore() {
        this.score += 100;
    }

    //clears the input buffer
    //increments the base frame delay as a penalty
    bailOut() {
        let cleared = this.inputBuffer.clear();

        if (cleared) {
            this.frameDelayBase++;
        }
    }

    //updates the direction buffer with a new direction
    //called once every frame
    updateDirBuffer(newDir) {
        this.dirBuffer = newDir;
    }

    //returns the stats of the current game session as a string
    //TODO: Return a JSON instead
    getStats() {
        return `Frame Time: ${1000 / this.frameRate}ms Frame Delay: ${this.frameDelay} frames`;
    }

    //updates the frame timings to adjust difficulty
    updateTimings() {
        this.frameRate = this.frameRateBase + floor(this.snake.size() / this.frameRateOffset);
        this.frameRate = Math.min(this.frameRate, this.frameRateMax);

        this.frameDelay = this.frameDelayBase + floor(this.snake.size() / this.frameDelayOffset);
        this.frameDelay = Math.min(this.frameDelay, this.frameDelayMax);
    }

    //returns a Part object which is used as the food to be eaten by the snake
    spawnFood() {
        //since the game is essentially a collection of 20px squares
        //the centre of any valid distance could be broken down into factors of 20
        //the range starts at 2 to avoid being too close to the walls
        let xpos = floor(random(2, (width - 20) / 20)) * 20;
        let ypos = floor(random(2, (height - 20) / 20)) * 20;

        //look for a valid position to spawn the snake
        //ISSUE: Not working properly
        while (this.snake.isOnSnake(createVector(xpos, ypos)) != 0) {
            xpos = floor(random(2, (width - 20) / 20)) * 20;
            ypos = floor(random(2, (height - 20) / 20)) * 20;
        }

        return new Part(xpos, ypos, color(128, 128, 128));
    }

    //renders the game on the screen
    //normally, this would be a while loop, but P5's draw function handles that for us
    draw() {
        frameRate(this.frameRate);
        strokeWeight(1);

        let eaten = this.snake.canEat(this.food.pos);
        if (eaten) {
            this.updateScore();
        }

        this.snake.draw();
        if (this.stopRendering) {
            return;
        }

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
            this.stopRendering = true;
        }

        let hitItself = this.snake.isOnSnake(snakePos, true);
        if (hitItself != 0) {
            this.snake.mark(hitItself, color(255, 30, 30));
            this.snake.updateDir(createVector(0, 0));
            this.stopRendering = true;
        }

        if (this.stopRendering) {
            setTimeout(() => {
                this.gameOver = true;
            }, 2000);
        }

        this.updateTimings();
    }
}
