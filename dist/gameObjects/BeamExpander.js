
class BeamExpander extends GameObject {

  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._rotation = 0;
  }

  /**
     * clone()
     * @description clones the BeamExpander
     * @returns {BeamExpander} a clone of the BeamExpander
     */
  clone() {
    let newBeamExpander = new BeamExpander();
    newBeamExpander._position = this._position;

    return newBeamExpander;
  }


  updateNode(grid, node) {
    node.width += 1;
    let nextPoint = grid.getNextSlot(node.point, node.direction);
    let nextDirection = this.updateDirection(node.direction);
    if(grid.pointInGrid(nextPoint) && nextDirection !== "stop") {
      return {
        ...node,
        direction: this.updateDirection(node.direction),
        point: nextPoint,
        width: node.width,
        children: []
      }
    } else {
      return null;
    }
    
  }

  /**
   * updateDirection()
   * @description updates the direction of the laser
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  updateDirection(direction) {

    while(this._rotation < 0) this._rotation += 360;

    const directionMap = {
        0: { right: "right"},
        90: { down: "down"},
        180: { left: "left"},
        270: { up: "up"}
    };

    return directionMap[(this._rotation % 360)][direction] || "stop";
  }

  _createPath() {
    this._path = [];

    let width = 20;
    let height = 5;
    let extraHeight = 5;

    let startX = this._position.x + GameObject.Size / 2 - width / 2;
    let startY = this._position.y + GameObject.Size / 2 - height / 2;
  
    // top left 
    this._path.push({
      x: startX, 
      y: startY
    });

    // top right
    this._path.push({
      x: startX + width, 
      y: startY - extraHeight
    });

    // bottom right
    this._path.push({
      x: startX + width, 
      y: startY + height + extraHeight
    });

    // bottom left
    this._path.push({
      x: startX, 
      y: startY + height
    });

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
    context.stroke();
  }

  
}
