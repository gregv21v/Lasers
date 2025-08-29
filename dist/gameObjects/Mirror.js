
class Mirror extends GameObject {
  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._rotation = 0;

    //this._createPath();
  }

  /**
     * clone()
     * @description clones the Mirror
     * @returns {Mirror} a clone of the Mirror
     */
  clone() {
    let newMirror = new Mirror();
    newMirror._rotation = this._rotation;
    newMirror._position = this._position;

    return newMirror;
  }


  _createPath() {
    this._path = [];

    this._path.push({
      x: this._position.x, 
      y: this._position.y
    });
    this._path.push({
      x: this._position.x + GameObject.Size, 
      y: this._position.y
    });
    this._path.push({
      x: this._position.x + GameObject.Size, 
      y: this._position.y + GameObject.Size
    });
  }

  /**
   * getNextNode()
   * @description gets the next node in the lasers path
   * @param {Grid} grid the grid this node is part of
   * @param {Node} node the laser node
   * @returns the next node in the laser path
   */
  getNextNode(grid, node) {
    let nextDirection = this.getNextDirections(node.direction)[0];
    let nextPoint = grid.getNextSlot(node.point, nextDirection);

    if(!grid.pointInGrid(nextPoint) || nextDirection === Direction.Stop) {
      return null;
    } else {
      return {
        ...node,
        direction: nextDirection,
        point: nextPoint,
        children: []
      }
    }
  }
  
  rotate(angle) {
    this._rotation += angle;
  }

  /**
   * 
   * @param {angle} angle the angle to rotate by
   */
  _applyRotation() {
    this._path = rotatePoints(this._path, this._rotation, {
      x: this._position.x + GameObject.Size / 2,
      y: this._position.y + GameObject.Size / 2
    })
  }


  /**
    render()
    @description initialize the values for the svg
  */
  render(context) {
    context.beginPath();

    this._createPath();
    this._applyRotation();

    
    context.moveTo(this._path[0].x, this._path[0].y);
    for (var i = 1; i < this._path.length; i++) {
      context.lineTo(this._path[i].x, this._path[i].y);
    }
    context.closePath();

    context.fillStyle = "silver";
    context.fill();

    context.strokeStyle = "black";
    context.stroke();

    //context.textBaseline = "middle";
    //context.textAlign = "center";
    //context.fillStyle = "black";
    //context.fillText(this._rotation, this._position.x + GameObject.Size / 2, this._position.y + GameObject.Size / 2)

  }

  /**
   * getNextDirections()
   * @description updates the direction of the laser
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  getNextDirections(direction) {

    while(this._rotation < 0) this._rotation += 360;

    const directionMap = {
        0: { 
          [Direction.Right]: Direction.Down,
          [Direction.Up]: Direction.Left,
          [Direction.Down]: Direction.Stop,
          [Direction.Left]: Direction.Stop
        },
        90: { 
          [Direction.Down]: Direction.Left,
          [Direction.Right]: Direction.Up,
          [Direction.Up]: Direction.Stop,
          [Direction.Left]: Direction.Stop 
        },
        180: { 
          [Direction.Down]: Direction.Right,
          [Direction.Left]: Direction.Up,
          [Direction.Right]: Direction.Stop,
          [Direction.Up]: Direction.Stop 
        },
        270: { 
          [Direction.Up]: Direction.Right,
          [Direction.Left]: Direction.Down,
          [Direction.Down]: Direction.Stop,
          [Direction.Right]: Direction.Stop
        }
    };


    return [directionMap[(this._rotation % 360)][direction]];
  }

  /**
   * reverseDirection()
   * @description reverses the direction of the laser
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  reverseDirection(direction) {
    const directionMap = {
        0: { 
          [Direction.Down]: Direction.Right,
          [Direction.Left]: Direction.Up,
          [Direction.Left]: Direction.Right,
          [Direction.Down]: Direction.Up
        },
        90: { 
          [Direction.Left]: Direction.Down,
          [Direction.Up]: Direction.Right,
          [Direction.Left]: Direction.Right,
          [Direction.Up]: Direction.Down
        },
        180: { 
          [Direction.Right]: Direction.Down,
          [Direction.Up]: Direction.Left,
          [Direction.Right]: Direction.Left,
          [Direction.Up]: Direction.Down
        },
        270: { 
          [Direction.Right]: Direction.Up,
          [Direction.Down]: Direction.Left,
          [Direction.Right]: Direction.Left,
          [Direction.Down]: Direction.Up 
        }
    };

    return directionMap[(this._rotation % 360)][direction] || direction;
  }
  

  
}
