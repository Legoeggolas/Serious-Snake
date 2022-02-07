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

class Snake {
    constructor(x, y) {
        this.body = new Array(1).fill().map((head) => new Part(x, y, color(165, 255, 214)));
        this.dir = createVector(0, 1);
        this.vel = createVector(0, 0);
    }

    draw() {
        for (let part of this.body) {
            part.draw();
        }
    }

    isOnSnake(pos, body) {
        for (let i = 0 + body; i < this.body.length; i++) {
            if (pos.equals(this.body[i].pos)) {
                return i;
            }
        }

        return 0;
    }

    canEat(pos) {
        let head = this.body[0];
        if (head.pos.equals(pos)) {
            return true;
        }

        return false;
    }

    updatePos(extend) {
        if (this.dir.mag() == 0.0) {
            return;
        }

        let newPart;
        if (extend === true) {
            let endPart = this.body[this.body.length - 1];
            newPart = new Part(endPart.pos.x, endPart.pos.y, color(165, 210, 200));
        }

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].pos.x = this.body[i - 1].pos.x;
            this.body[i].pos.y = this.body[i - 1].pos.y;
        }

        if (newPart) {
            this.body.push(newPart);
        }

        this.vel = this.dir.copy();
        this.vel.mult(20);

        this.body[0].pos.x += this.vel.x;
        this.body[0].pos.y += this.vel.y;
    }

    updateDir(dir) {
        if (this.dir.mag() == 0.0) {
            return;
        }

        let temp = this.dir.copy();
        temp.add(dir);
        if (temp.mag() != 0.0) {
            this.dir = dir;
        }
    }

    getPos() {
        return this.body[0].pos;
    }

    mark(index, color) {
        this.body[index].color = color;
    }

    size() {
        return this.body.length;
    }
}
