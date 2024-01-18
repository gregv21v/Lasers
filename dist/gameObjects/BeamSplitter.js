class BeamSplitter extends GameObject {
    /**
      constructor()
      @description constructs the block
    */
    constructor(position = {x: 0, y: 0}) {
      super(position);
      this._rotation = 45;
      this._directions = ["down", "right"]
      
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
    }
  
    getDirections(inputDirection) {
      let map = {
        0: { down: "right", right: "down", up: "left", left: "up"},
        90: { down: "left", right: "up", up: "right", left: "down"}
      }
      return [map[this._rotation - 45][inputDirection]].concat(inputDirection)
    }
  

  }