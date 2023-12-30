
class Lens extends GameObject {

  /**
    constructor()
    @description constructs the block
  */
  constructor(position = {x: 0, y: 0}) {
    super(position);
  }

  /**
    render()
    @description initialize the values for the svg
  */
  render(context) {
    context.beginPath();
    context.ellipse(
      this._position.x + GameObject.Size / 2, this._position.y + GameObject.Size / 2,
      5, GameObject.Size / 2, 0, 0, Math.PI * 2
    );
    context.closePath();

    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fill();

    context.strokeStyle = "black";
    context.stroke();
  }

  
}
