
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
     * clone()
     * @description clones the Block
     * @returns {Block} a clone of the Block
     */
    clone() {
      let newBlock = new Block();
      newBlock._position = this._position;

      return newBlock;
    }
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      context.fillStyle = "black";
      context.fillRect(this._position.x, this._position.y, GameObject.Size, GameObject.Size);
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
      return null;
    }


    getNextDirections(direction) {
      return [Direction.Stop];
    }

    getPreviousDirections(direction) {
      return [];
    }
}
  