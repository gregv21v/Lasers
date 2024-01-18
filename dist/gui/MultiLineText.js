/**
 * MultiLineText - a box that displays text 
 */

class MultiLineText {
    /**
     * constructor()
     * @description constructs the text box
     * @param {Point} position the position of the text box
     * @param {String} text the text to display
     */
    constructor(position, lines) {
        this._position = position;
        this._lines = lines;
    }


    render(context) {
        let i = 0;
        for (const line of this._lines) {
            context.fillText(line, this._position.x, this._position.y + 15 * i);
            i++;
        }
        
    }
}