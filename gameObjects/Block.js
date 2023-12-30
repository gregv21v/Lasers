/**
 * Block - blocks the laser beam travel
 */
class Block extends GameObject {

    /**
      constructor()
      @description constructs the Target
    */
    constructor(position = {x: 0, y: 0}) {
      super(position);
    }
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      context.fillStyle = "black";
      context.fillRect(this._position.x, this._position.y, GameObject.Size, GameObject.Size);
    }
}
  