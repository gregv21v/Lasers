/**
 * BeamExpander - expands the laser beam when it enters this GameObject.
 */
class BeamExpander extends GameObject {

  /**
   * constructor()
   * @description constructs this BeamExpander
   * @param {Point} position the position of this GameObject
   */
  constructor(position = {x: 0, y: 0}) {
    super(position);
  }


  /**
   * _createPath()
   * @description creates the path of the graphic for the GameObject
   */
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
   * render()
   * @description renders the beam expander graphic
   * @param {CanvasRenderingContext2D} context the context to render to
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

  


  /**
   * getNextNode()
   * @description gets the next node in the lasers path
   * @param {Grid} grid the grid this node is part of
   * @param {Node} node the laser node
   * @returns the next node in the laser path
   */
  getNextNode(grid, node) {
    node.width += 1;
    let nextPoint = grid.getNextSlot(node.point, node.direction);
    let nextDirection = this.getNextDirections(node.direction)[0];
    if(grid.pointInGrid(nextPoint) && nextDirection !== Direction.Stop) {
      return {
        ...node,
        direction: nextDirection,
        point: nextPoint,
        width: node.width,
        children: []
      }
    } else {
      return null;
    }
    
  }

  /**
   * getNextDirection()
   * @description gets the direction that comes after this one in the laser path.
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  getNextDirections(direction) {

    while(this._rotation < 0) this._rotation += 360;

    const directionMap = {
        0: { [Direction.Right]: Direction.Right },
        90: { [Direction.Down]: Direction.Down },
        180: { [Direction.Left]: Direction.Left },
        270: { [Direction.Up]: Direction.Up }
    };

    return [directionMap[(this._rotation % 360)][direction] || Direction.Stop];
  }

  /**
   * clone()
   * @description clones the BeamExpander
   * @returns {BeamExpander} a clone of the BeamExpander
   */
  clone() {
    let newBeamExpander = new BeamExpander(this._position);
    return newBeamExpander;
  }

  
}
