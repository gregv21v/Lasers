
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

    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(this._rotation, this._position.x + GameObject.Size / 2, this._position.y + GameObject.Size / 2)

  }



  /**
   * updateDirection()
   * @description updates the direction of the laser
   * @param {direction} direction the current direction of the laser  
   * @returns the new direction of the laser
   */
  updateDirection(direction) {
    const directionMap = {
        0: { right: "down", up: "left", left: "stop", down: "stop"},
        90: { down: "left", right: "up", left: "stop", up: "stop"},
        180: { down: "right", left: "up", right: "stop", up: "stop" },
        270: { up: "right", left: "down", right: "stop", down: "stop" }
    };

    return directionMap[(this._rotation % 360)][direction] || direction;
  }


  
}
