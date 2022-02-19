//defines a clickable button
//the method isSelected() returns whether the mouse is hovering over the text or not
//the draw() method also uses this information to change the visuals
//accepts a function onClick() which is stored in the object
class Button {
    constructor(x, y, a, b, txt, onClick) {
        //position and dimensions
        this.xpos = x;
        this.ypos = y;
        this.length = a;
        this.width = b;

        //text properties
        this.text = txt;
        this.textFont = "Verdana";
        this.textFontSize = 32;
        this.textColorBase = color(0, 0, 0);
        this.textColorHover = color(50, 100, 150);
        this.textColor = this.textColorBase;

        //button body properties
        this.colorBase = color(90, 202, 236);
        this.colorHover = color(80, 180, 110);
        this.color = this.colorBase;
        this.strokeWidthBase = 1;
        this.strokeWidthHover = 4;
        this.strokeWidth = 1;

        //
        this.onClick = onClick;
    }

    isSelected() {
        return (
            Math.abs(mouseX - this.xpos) <= this.length / 2 &&
            Math.abs(mouseY - this.ypos) <= this.width / 2
        );
    }

    draw() {
        if (this.isSelected()) {
            //button is being hovered on
            //change the visuals
            this.strokeWidth = this.strokeWidthHover;
            this.color = this.colorHover;
            this.textColor = this.textColorHover;
        } else {
            //use base visuals
            this.strokeWidth = this.strokeWidthBase;
            this.color = this.colorBase;
            this.textColor = this.textColorBase;
        }

        stroke(0, 0, 0);
        strokeWeight(this.strokeWidth);
        fill(this.color);
        rect(this.xpos, this.ypos, this.length, this.width);

        textFont(this.textFont);
        textSize(this.textFontSize);
        fill(this.textColor);
        strokeWeight(1);
        textAlign(CENTER, CENTER);
        text(this.text, this.xpos, this.ypos);
    }
}
