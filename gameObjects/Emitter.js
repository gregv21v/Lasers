class Emitter extends GameObject {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._rotation = 0;
    this._color = "red";
    
  }

  /**
   * updateNode()
   * @description updates the emitter node
   * @param {Grid} grid the grid this game object is in
   * @param {Node} node the node of the emitter, should just contain a point
   * @returns the next node for the beam
   */
  updateNode(grid, node) {
    let nextPoint = grid.getNextSlot(node.point, this.direction);
    if(grid.pointInGrid(nextPoint)) {
      return {
        ...node,
        point: nextPoint,
        color: "red",
        width: 1,
        direction: this.direction,
        children: []
      }
    } else {
      return null;
    }
  }


  /**
     * clone()
     * @description clones the Emitter
     * @returns {Emitter} a clone of the Emitter
     */
  clone() {
    let newEmitter = new Emitter();
    newEmitter._rotation = this._rotation;
    newEmitter._position = this._position;

    return newEmitter;
  }

  _createPath() {
    this._path = [];

    // top left
    this._path.push({
      x: this._position.x, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 16
    })

    // 
    this._path.push({
      x: this._position.x + GameObject.Size - 10, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x + GameObject.Size - 10, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 8 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x + GameObject.Size, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 8 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x + GameObject.Size, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 4 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x + GameObject.Size - 10, 
      y: this._position.y + GameObject.Size / 4 + GameObject.Size / 4 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x + GameObject.Size - 10, 
      y: this._position.y + GameObject.Size / 4 + 3 * GameObject.Size / 8 + GameObject.Size / 16
    })

    this._path.push({
      x: this._position.x, 
      y: this._position.y + GameObject.Size / 4 + 3 * GameObject.Size / 8 + GameObject.Size / 16
    })

  }

  


  rotate(angle) {
    this._rotation += (angle % 360);
  }

  /**
    render()
    @description initialize the values for the svg
  */
  render(context) {

    this._createPath();
    this._applyRotation(this._rotation);

    
    context.beginPath();
    context.moveTo(
      this._path[0].x, this._path[0].y
    )
    for (const point of this._path) {
      context.lineTo(point.x, point.y);
    }
    context.closePath();

    context.strokeStyle = "black";
    context.fillStyle = "grey";
    context.stroke();
    context.fill();
  }


  get direction() {

    while(this._rotation < 0) this._rotation += 360;

    return {
      0: "right",
      90: "down",
      180: "left",
      270: "up"
    }[this._rotation % 360];
  }
  




}