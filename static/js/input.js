//defines a game input
//stores the frames left till the input should be executed
//and the directional change it will cause to the snake
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

    //translates a directional vector into a readable string format
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

//the input buffer works as a priority queue
//uses the number of frames left as the priority (smaller is better)
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

    //if an input is ready to be executed, returns it
    //otherwise returns a null object
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

    //clears the buffer by reinitializing the underlying array
    clear() {
        if (this.buffer.length == 0) {
            return false;
        }
        this.buffer.length = 0;

        return true;
    }

    //returns all the inputs in the buffer as a string
    //TODO: Return a JSON instead
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
