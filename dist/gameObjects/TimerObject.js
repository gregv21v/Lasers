
class TimerObject extends GameObject {

    /**
      constructor()
      @description constructs the Target
    */
    constructor(position = {x: 0, y: 0}) {
      super(position);
      
      this._activated = false;
      this._requiredLaserSize = 1;
      this._currentTime = 0;
      this._endTime = 300;
      this._pulseLength = 100;
    }

    /**
     * clone()
     * @description clones the Rotator
     * @returns {Rotator} a clone of the Rotator
     */
    clone() {
      let timer = new TimerObject();
      timer._activated = this._activated;
      timer._requiredLaserSize = this._requiredLaserSize;
      timer._position = this._position;
      timer._currentTime = this._currentTime;
      timer._endTime = this._endTime;

      return timer;
    }


    
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      const color = (this._activated) ? "red" : "black";
      let angle = Math.PI * 2 * (this._currentTime / (this._endTime + this._pulseLength));
      let pulseStartAngle = Math.PI * 2 * (this._endTime / (this._endTime + this._pulseLength));
      let pulseEndAngle = Math.PI * 2;

      let center = {
        x: this._position.x + GameObject.Size / 2, 
        y: this._position.y + GameObject.Size / 2
      }
      let radius = GameObject.Size / 2

      context.beginPath();
      context.ellipse(
        center.x, center.y,
        radius, radius,
        0, 0, Math.PI * 2
      )

      context.strokeStyle = color;
      context.stroke();


      context.beginPath();
      context.moveTo(center.x, center.y)
      context.lineTo(
        center.x + radius * Math.cos(pulseStartAngle),
        center.y + radius * Math.sin(pulseStartAngle)
      )
      context.arc(
        center.x, 
        center.y,  
        radius, pulseStartAngle, pulseEndAngle
      )

      context.lineTo(
        center.x + radius * Math.cos(pulseEndAngle),
        center.y + radius * Math.sin(pulseEndAngle)
      )

      context.closePath();
      context.fillStyle = color;
      context.fill();



      // draw the hand of the timer
      context.beginPath();
      context.moveTo(
        center.x, 
        center.y,  
      );

      context.lineTo(
        center.x + radius * Math.cos(angle), 
        center.y + radius * Math.sin(angle),  
      )

      context.strokeStyle = "black";
      context.stroke();
      
    }


    update(grid, pointer) {
      console.log("update timer");
      
      this._needsUpdate = false;
      this._currentTime++;
      if(this._currentTime > this._endTime) {
        // trigger adjacent blocks
        this.activate();
        if(this._currentTime > this._endTime + this._pulseLength) {
          this.deactivate();
          this._currentTime = 0;
        }
      }
    }
  
    /**
     * getNextNode()
     * @description gets the next node in the lasers path
     * @param {Grid} grid the grid this node is part of
     * @param {Node} node the laser node
     * @returns the next node in the laser path
     */
    getNextNode(grid, node) {
      let nextPoint = grid.getNextSlot(node.point, node.direction);

      if(this._activated && grid.pointInGrid(nextPoint)) 
        return {
          ...node,
          point: nextPoint,
          children: []
        }; 
      else return null;
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


    /**
     * get isTimed()
     * @description gets whether this is a timed object
     * @return {boolean} true if this is a timed object, false otherwise
     */
    get isTimed() {
      return true;
    }
   
  }
  