/**
  Button - a plot of land that can be farmed on
*/
class Button {
    /**
      constructor()
      @description constructs the item
      @param {Object} position the position of the button
      @param {Number} width the width of the button
      @param {Number} height the height of the button
      @param {String} text the text to display on the button
      @param {Function} onClickFn the function to call when the button is clicked
    */
    constructor(position, width, height, text, onClickFn) {
      this._text = text;
      this._width = width;
      this._height = height;
      this._position = position;
      this._onClickFn = onClickFn;
      this._enabled = true;
    }

    /**
      render()
      @description initializes the values of the svg objects
    */
    render(context) {
        context.fillStyle = (this._enabled) ? "green" : "grey";
        context.fillRect(this._position.x, this._position.y, this._width, this._height);

        context.font = "15px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this._text, this._position.x + this._width / 2, this._position.y + this._height / 2);
    }


    /**
     * contains()
     * @description check if this slot contains a given point
     * @param {Point} point the point to check for 
     */
    contains(point) {
        return (
            this._position.x < point.x && point.x < this._position.x + this._width &&
            this._position.y < point.y && point.y < this._position.y + this._height
        )
    }


    /**
     * onClick()
     * @param {Point} point the click point
     * @returns
     */
    onClick(point) {
        if (this._enabled && this.contains(point)) this._onClickFn();
    }
  
    /**
      get width()
      @description gets the width of the inventory
    */
    get width() {
      return this._width
    }
  
    /**
      set width()
      @description sets the width of the inventory
    */
    set width(value) {
      this._width = value;
    }
  
    /**
      get height()
      @description gets the height of the inventory
    */
    get height() {
      return this._height
    }
  
    /**
      set height()
      @description sets the height of the inventory
    */
    set height(value) {
      this._height = value;
    }



    /**
     * get text()
     * @description gets the text of the button
     */
    get text() {
      return this._text;
    }

    /**
     * set text()
     * @description sets the text of the button
     */
    set text(value) {
      this._text = value;
    }
   
    enable() {
      this._enabled = true;
    }

    disable() {
      this._enabled = false;
    }
  
    



  }
  