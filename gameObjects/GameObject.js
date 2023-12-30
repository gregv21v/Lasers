/**
  Item
*/


class GameObject {
  static Size = 30;

  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    this._name = "Item"
    this._displayName = "Item";
    this._position = position;
    this._quantity = 1;
    this._imageURL = "";
    this._elements = {}
    this._description = ""
  }

 



   

  /**
    toJSON()
    @description converts this slot to its json representation
  */
  toJSON() {
    return {
      name: this.name,
      quantity: this._quantity
    }
  }

  /**
   * clone()
   * @description creates a clone of this item
   * @returns a clone of this item
   */
  clone() {
    let clone = new GameObject(this._position);
    clone.quantity = this._quantity;

    clone.render()
    return clone
  }

  updateDirection(direction) {
    return direction;
  }

  /**
    render()
    @description initialize the values for the svg
  */
  render(context) {
    context.fillRect(this._position.x, this._position.y, GameObject.Size, GameObject.Size);
    context.fillText(this._name, this._position.x, this._position.y);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
  }

  
  _createPath() {
    this._path = [];
  }
  
  rotate(angle) {
    this._rotation = angle;
  }

  /**
   * 
   * @param {angle} angle the angle to rotate by
   */
  _applyRotation(angle) {
    this._rotation = angle;
    this._path = rotatePoints(this._path, angle, {
      x: this._position.x + GameObject.Size / 2,
      y: this._position.y + GameObject.Size / 2
    })
  }

  /**
    setPosition()
    @description sets the position of this item
    @param position the new position of this item
  */
  set position(position) {
    this._position = position
  }

  /**
    get position
    @description gets the position of the item
  */
  get position() {
    return this._position;
  }





  /**
    onClick()
    @description the function called when this item is clicked
  */
  onClick() {
    // do something ...
    console.log(this.name);
  }

  /**
    onMouseDown()
    @description the function called when the mouse is held down over
      the item
  */
  onMouseDown() {
    //
  }

  /**
    onMouseOver()
    @description the function called when you mouse over
      this item
  */
  onMouseOver() {
    this.tooltip.show()
  }

  /**
    onMouseOut()
    @description the function when the mouse leaves the
      area of the item
  */
  onMouseOut() {
    this.tooltip.hide()
  }
}
