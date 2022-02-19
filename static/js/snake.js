//defines a base shape object
//parts are used both to represent the food as well as the body of the snake
//the constructor accepts the centre coordinates of the part as well as its color
class Part {
    constructor(x, y, color) {
        this.pos = createVector(x, y);
        this.color = color;
    }

    draw() {
        rectMode(CENTER);
        fill(this.color);
        rect(this.pos.x, this.pos.y, 20, 20);
    }
}

//class defining the snake
//the constructor accepts the starting position of the snake
class Snake {
    constructor(x, y) {
        this.body = new Array(1).fill().map((head) => new Part(x, y, color(165, 255, 214)));
        this.dir = createVector(0, 1);
        this.vel = createVector(0, 0);
    }

    //partwise draw the snake's body
    draw() {
        for (let part of this.body) {
            part.draw();
        }
    }

    //returns whether the given position lies on the snake or not
    //the body flag is used to either include or exclude the head
    isOnSnake(pos, body) {
        for (let i = 0 + body; i < this.body.length; i++) {
            if (pos.equals(this.body[i].pos)) {
                return i;
            }
        }

        return 0;
    }

    //checks whether the snake's head corresponds to the given position
    canEat(pos) {
        let head = this.body[0];
        if (head.pos.equals(pos)) {
            return true;
        }

        return false;
    }

    //updates the position of each part of the snake's body
    //the extend flag is used to add another part at the tail
    updatePos(extend) {
        //snake is not moving, return
        if (this.dir.mag() == 0.0) {
            return;
        }

        let newPart;
        if (extend === true) {
            //the new part will take place of the current last part's position before the snake moves
            let endPart = this.body[this.body.length - 1];
            newPart = new Part(endPart.pos.x, endPart.pos.y, color(165, 210, 200));
        }

        //let each part take the position of the part that comes before it
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].pos.x = this.body[i - 1].pos.x;
            this.body[i].pos.y = this.body[i - 1].pos.y;
        }

        if (newPart) {
            this.body.push(newPart);
        }

        this.vel = this.dir.copy();
        this.vel.mult(20);

        //move the head depending on the direction
        this.body[0].pos.x += this.vel.x;
        this.body[0].pos.y += this.vel.y;
    }

    //update the direction of the snake
    updateDir(dir) {
        //the snake is to be stopped
        if (this.dir.mag() == 0.0) {
            return;
        }

        let temp = this.dir.copy();
        temp.add(dir);
        if (temp.mag() != 0.0) {
            this.dir = dir;
        }
    }

    //returns the current position of the snake
    getPos() {
        return this.body[0].pos;
    }

    //changes the color of a body piece of the snake
    mark(index, color) {
        this.body[index].color = color;
    }

    //returns the size of the snake
    size() {
        return this.body.length;
    }
}
