
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
  

    /**
     * @description true if the target is active
     */
    isActivated() {
      return this._activated;
    }

    /**
     * @description activates the target
     */
    activate() {
      this._activated = true;
    }

    /**
     * @description deactivates the target
     */
    deactivate() {
      this._activated = false;
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
  