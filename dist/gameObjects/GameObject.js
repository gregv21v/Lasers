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
    this._position = position;
    this._activated = false;
    this._rotationToggle = false;
    this._hasBeam = false;
    this._inDirection = "";
    this._needsUpdate = false;
    this._stateChanged = false;
  }

  
  /**
     * update()
     * @description updates the game object when no laser is input
     * @param {Grid} grid the grid that this game object is on
     * @param {Point} pointer the location on the grid of the game object
     */
  update(grid, pointer) {

  }


  /**
   * place()
   * @description places a rotator game object
   * @param {Grid} grid the grid that the Rotator is placed on
   * @param {Point} pointer the point the Rotator is placed at 
   */
  place(grid, pointer) {
      
  }


  updateNode(grid, node) {
    this._needsUpdate = false;
    return {...node, children: []}
  }
 

  /**
   * updateDirection()
   * @description updates the direction of the laser
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  updateDirection(direction) {
    return direction;
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

  reverseDirection(direction) {
    return {
      left: "right",
      right: "left",
      up: "down",
      down: "up"
    }[direction];
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


  get hasBeam() {
    return this._hasBeam;
  }

  set hasBeam(val) {
    this._hasBeam = val;
  }


  /**
   * @description true if the target is active
   */
  isActivated() {
    return this._activated;
  }

  /**
   * @description activates the target
   */
  activate() {
    this._activated = true;
  }

  /**
   * @description deactivates the target
   */
  deactivate() {
    this._activated = false;
  }

  toggle() {
    this._activated = !this._activated;
  }

  
  get inDirection() {
    return this._inDirection;
  }

  set inDirection(value) {
    this._inDirection = value;
  }


  get needsUpdate() {
    return this._needsUpdate;
  }

  set needsUpdate(value) {
    this._needsUpdate = value;
  }


  get stateChanged() {
    return this._stateChanged;
  }

  set stateChanged(value) {
    this._stateChanged = value;
  }
}
