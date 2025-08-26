
class Delay extends GameObject {

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
      this._triggered = false;
    
    }

    /**
     * clone()
     * @description clones the Rotator
     * @returns {Rotator} a clone of the Rotator
     */
    clone() {
      let delay = new Delay();
      delay._activated = this._activated;
      delay._requiredLaserSize = this._requiredLaserSize;
      delay._position = this._position;
      delay._currentTime = this._currentTime;
      delay._endTime = this._endTime;

      return delay;
    }


    
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      const color = (this._activated) ? "red" : "black";
      let angle = 0;
      if(this._timerStarted && this._activated) {
        angle = Math.PI * 2;
      } else {
        angle = Math.PI * 2 * (this._currentTime / this._endTime);
      }
      let pulseStartAngle = Math.PI * 2;
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
        if (this._stateChanged) {
            // start the timer 
            if(this._activated) {
                this._timerStarted = true;
                this._currentTime = 0;
                this.deactivate();
            } else {
                this._timerStarted = false;
                this._currentTime = 0;
                this.deactivate();
            }
            
        }

        if (this._timerStarted) {
            this._currentTime++;
            if (this._currentTime > this._endTime) {
                this.activate();
            }
        }

        
    }


    pickUp() {
        super.pickUp();
        this._timerStarted = false;
        this._currentTime = 0;
    }
   

    /**
    * place()
    * @description places a rotator game object
    * @param {Grid} grid the grid that the Rotator is placed on
    * @param {Point} pointer the point the Rotator is placed at 
    */
    place(grid, pointer) {
        let cellOn = grid.getCellState(pointer.x, pointer.y);

        if(cellOn) {
            this.activate();
        } else {
            this.deactivate();
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
  }
  