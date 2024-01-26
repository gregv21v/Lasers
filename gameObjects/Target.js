
class Target extends GameObject {

    /**
      constructor()
      @description constructs the Target
    */
    constructor(position = {x: 0, y: 0}) {
      super(position);

      this._activated = false;
      this._requiredLaserSize = 1;
    }

    /**
     * clone()
     * @description clones the target
     * @returns {Target} a clone of the Target
     */
    clone() {
      let newTarget = new Target();
      newTarget._activated = this._activated;
      newTarget._requiredLaserSize = this._requiredLaserSize;
      newTarget._position = this._position;

      return newTarget;
    }
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      context.beginPath();
      context.ellipse(
        this._position.x + GameObject.Size / 2, 
        this._position.y + GameObject.Size / 2,
        GameObject.Size / 3, GameObject.Size / 3, 
        0, 0, Math.PI * 2
      );
      context.closePath();

      context.fillStyle = "white";
      context.fill();
  
      context.strokeStyle = (this._activated) ? "red" : "black";
      context.stroke();

      context.beginPath();
      context.ellipse(
        this._position.x + GameObject.Size / 2, 
        this._position.y + GameObject.Size / 2,
        this.requiredLaserSize, this.requiredLaserSize,
        0, 0, Math.PI * 2
      );
      context.closePath();
  
      context.fillStyle = (this._activated) ? "red" : "black";
      context.fill();
  
      context.strokeStyle = (this._activated) ? "red" : "black";
      context.stroke();
    }

    update(grid, pointer) {
      if(grid.getLaserWidthAt(pointer.x, pointer.y) === this._requiredLaserSize) {
        this.activate();
      } else {
        this.deactivate();
      }
    }

    updateNode(grid, node) {
      return null;
    }


    updateDirection(direction) {
      return "stop";
    }
    

    /**
     * @description sets the required laser size
     */
    set requiredLaserSize(value) {  
      this._requiredLaserSize = value;
    }

    /**
     * @description gets the required laser size
     */
    get requiredLaserSize() {
      return this._requiredLaserSize;
    }
  }
  