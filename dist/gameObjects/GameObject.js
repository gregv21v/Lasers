
/**
  GameObject - the main building block of the game
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
    this._stateChanged = false;
    this._rotation = 0;
    this._canPickUp = true;
    this._rotationOffset = 0;
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
   * @description places a game object
   * @param {Grid} grid the grid that the GameObject is placed on
   * @param {Point} pointer the point the GameObject is placed at 
   */
  place(grid, pointer) {
      this.update(grid, pointer);
  }


  /**
   * move()
   * @description moves the Game Object 
   * @param {Grid} grid the grid that this Game Object is on
   * @param {Point} pointer the location on the grid of the Game Object
   */
  move(grid, pointer) {
      this.update(grid, pointer);
  }


  /**
   * pickUp()
   * @description picks up a game object
   */
  pickUp() {
      this.deactivate();
  }


  /**
   * getNextNode()
   * @description gets the next node in the lasers path
   * @param {Grid} grid the grid this node is part of
   * @param {Node} node the laser node
   * @returns the next node in the laser path
   */
  getNextNode(grid, node) {
    this._needsUpdate = false;
    return {...node, children: []}
  }
 

  /**
   * getNextDirection()
   * @description gets the next direction of the laser
   * @param {direction} direction the current direction the laser is going  
   * @returns the next direction of the laser
   */
  getNextDirections(direction) {
    return [direction];
  }

  getPreviousDirections(direction) {
    return [{
      [Direction.Left]: Direction.Right,
      [Direction.Right]: Direction.Left,
      [Direction.Up]: Direction.Down,
      [Direction.Down]: Direction.Up
    }[direction]];
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
    this._rotation += angle;
  }

  /**
   * 
   * @param {angle} angle the angle to rotate by
   */
  _applyRotation(angle) {
    //this._rotation = angle;
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

  get rotation() {
    return this._rotation;  
  }


  /**
   * get isTimed()
   * @description gets whether this is a timed object
   * @return {boolean} true if this is a timed object, false otherwise
   */
  get isTimed() {
    return false;
  }


  set canPickUp(value) {
    this._canPickUp = value;
  }

  get canPickUp() {
    return this._canPickUp;
  }


  get rotationOffset() {
    return this._rotationOffset; 
  }


  /**
   * clone()
   * @description creates a clone of this item
   * @returns a clone of this item
   */
  clone() {
    let clone = new GameObject(this._position);
    clone._rotation = this._rotation
    return clone
  }




}
