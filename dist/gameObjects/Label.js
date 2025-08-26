
/**
 * Label - a label to mark different lasers
 */
class Label extends GameObject {
    constructor(position, text) {
        super(position);
        this._text = text;
    }


    clone() {
        let copy = new Label(this._position, this._text);
        copy._rotation = this._rotation;
        return copy;
    }


    render(context) {
        context.save();
        context.translate(this._position.x + GameObject.Size / 2, this._position.y + GameObject.Size / 2);
        context.rotate(this._rotation);
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "black";
        context.font = "12px Arial";
        context.fillText(this._text, 0, 0);
        context.restore();
    }


    rotate() {

    }
}