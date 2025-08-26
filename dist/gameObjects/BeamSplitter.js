
class BeamSplitter extends GameObject {
    /**
     * constructor()
     * @description constructs this BeamSplitter
     * @param {Point} position the position of this GameObject
     */
    constructor(position = {x: 0, y: 0}) {
      super(position);
      this._rotation = 45; // the rotation of the BeamSplitter
    }


    /**
     * getNextNode()
     * @description gets the next node in the lasers path
     * @param {Grid} grid the grid this node is part of
     * @param {Node} node the laser node
     * @returns the next node in the laser path
     */
    getNextNode(grid, node) {
      return this.getNextDirections(node.direction).map(direction => {
        let nextPoint = grid.getNextSlot(node.point, direction)

        if(grid.pointInGrid(nextPoint)) {
          return {
            ...node,
            point: nextPoint,
            direction, 
            children: []
          }
        } else {
          return null;
        }
      })
    }

    
  
    _createPath() {
        this._path = [];
    
        this._path.push({
          x: this._position.x + GameObject.Size / 2 - GameObject.Size / 8, 
          y: this._position.y
        });
        this._path.push({
          x: this._position.x + GameObject.Size / 2 - GameObject.Size / 8 + GameObject.Size / 4, 
          y: this._position.y
        });
        this._path.push({
          x: this._position.x + GameObject.Size / 2 - GameObject.Size / 8 + GameObject.Size / 4, 
          y: this._position.y + GameObject.Size
        });

        this._path.push({
            x: this._position.x + GameObject.Size / 2 - GameObject.Size / 8, 
            y: this._position.y + GameObject.Size
        });
      }
  
    
  
  
    /**
     * 
     * @description rotates the beam splitter. (available rotations 0, 90)
     * @param {angle} angle the angle of rotation
     */
    rotate(angle) {
      this._rotation += angle;
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

      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText(this._rotation, this._position.x + GameObject.Size / 2, this._position.y + GameObject.Size / 2)

    }
  
    getNextDirections(inputDirection) {
      while(this._rotation < 0) this._rotation += 360;

      let map = {
        0: { 
          [Direction.Down]: Direction.Right, 
          [Direction.Right]: Direction.Down, 
          [Direction.Up]: Direction.Left, 
          [Direction.Left]: Direction.Up
        },
        90: { 
          [Direction.Down]: Direction.Left, 
          [Direction.Right]: Direction.Up, 
          [Direction.Up]: Direction.Right, 
          [Direction.Left]: Direction.Down
        }
      }
      return [map[(this._rotation - 45) % 180][inputDirection]].concat(inputDirection)
    }


    /**
     * clone()
     * @description clones the BeamSplitter
     * @returns {BeamSplitter} a clone of the BeamSplitter
     */
    clone() {
      let newBeamSplitter = new BeamSplitter();
      newBeamSplitter._position = this._position;
      newBeamSplitter._direction = this._direction; 
      newBeamSplitter._rotation = this._rotation;

      return newBeamSplitter;
    }
  

  }