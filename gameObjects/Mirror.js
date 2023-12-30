
class Mirror extends GameObject {
  static Size = 30;

  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
    this._rotation = 0;

    //this._createPath();
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
    render()
    @description initialize the values for the svg
  */
  render(context) {
    context.beginPath();

    this._createPath();
    this._applyRotation(this._rotation);

    context.moveTo(this._path[0].x, this._path[0].y);
    for (var i = 1; i < this._path.length; i++) {
      context.lineTo(this._path[i].x, this._path[i].y);
    }
    context.closePath();

    context.fillStyle = "silver";
    context.fill();

    context.strokeStyle = "black";
    context.stroke();
  }



  updateDirection(direction) {
    const directionMap = {
        0: { right: "down", up: "left" },
        90: { down: "left", right: "up" },
        180: { down: "right", left: "up" },
        270: { up: "right", left: "down" }
    };

    return directionMap[this._rotation][direction] || direction;
  }


  
}
