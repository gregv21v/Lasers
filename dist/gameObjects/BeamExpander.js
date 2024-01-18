
class BeamExpander extends GameObject {

  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
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

  /**
    render()
    @description initialize the values for the svg
  */
  render(context) {
    let smallerRadius = GameObject.Size / 6;
    let largerRadius = GameObject.Size / 4;
    let xOffset = 5;

    context.beginPath();
    context.ellipse(
      this._position.x + GameObject.Size / 2 + xOffset, 
      this._position.y + GameObject.Size / 2,
      3, largerRadius, 0, 0, Math.PI * 2
    );
    context.closePath();

    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fill();

    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.ellipse(
      this._position.x + GameObject.Size / 2 - 10 + xOffset, 
      this._position.y + GameObject.Size / 2,
      3, smallerRadius, 0, Math.PI / 2, -Math.PI / 2
    );
    context.closePath();

    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fill();

    context.strokeStyle = "black";
    context.stroke();


    context.beginPath();
    context.moveTo(
      this._position.x + GameObject.Size / 2 - 10 + xOffset,
      this._position.y + GameObject.Size / 2 + smallerRadius
    )

    context.lineTo(
      this._position.x + GameObject.Size / 2 + xOffset,
      this._position.y + GameObject.Size / 2 + largerRadius
    )

    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.moveTo(
      this._position.x + GameObject.Size / 2 - 10 + xOffset,
      this._position.y + GameObject.Size / 2 - smallerRadius
    )

    context.lineTo(
      this._position.x + GameObject.Size / 2 + xOffset,
      this._position.y + GameObject.Size / 2 - largerRadius
    )

    context.strokeStyle = "black";
    context.stroke();
  }

  
}
