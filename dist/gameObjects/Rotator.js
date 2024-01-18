
class Rotator extends GameObject {

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
     * @description clones the Rotator
     * @returns {Rotator} a clone of the Rotator
     */
    clone() {
      let newRotator = new Rotator();
      newRotator._activated = this._activated;
      newRotator._requiredLaserSize = this._requiredLaserSize;
      newRotator._position = this._position;

      return newRotator;
    }


    renderArrowHead(context, center, radius, angle) {
       context.save();
       context.translate(center.x+radius*Math.cos(angle), center.y+radius*Math.sin(angle));
       context.rotate(angle);
       context.beginPath();
       context.moveTo(-5, -5);
       context.lineTo(0, 0);
       context.lineTo(5, -5);
       context.stroke();
       context.restore();
    }
  
    /**
      render()
      @description initialize the values for the svg
    */
    render(context) {
      const color = (this._activated) ? "red" : "black";
      const startAngle = Math.PI * 1/12;
      const bottomArc = {
        start: Math.PI * 1/12,
        end: Math.PI * 11/12
      }

      const topArc = {
        start: -Math.PI * 1/12,
        end: -Math.PI * 11/12
      }
      const endAngle = Math.PI * (11/12);
      const radius = GameObject.Size / 2;
      const theta = 45 * Math.PI / 180; // the number of radians away from the context each side of an arrow head is
      let arrowSize = 10;
      let center = {
        x: this._position.x + GameObject.Size / 2,
        y: this._position.y + GameObject.Size / 2
      }

      const endX = center.x + radius * Math.cos(topArc.end);
      const endY = center.y + radius * Math.sin(topArc.end);
      const angle = (1/Math.atan2(endY, endX)) / 2;
      const arrowhead1X = endX + arrowSize * Math.cos(angle - theta);
      const arrowhead1Y = endY + arrowSize * Math.sin(angle - theta);
      const arrowhead2X = endX + arrowSize * Math.cos(angle + theta);
      const arrowhead2Y = endY + arrowSize * Math.sin(angle + theta);

      const startX = center.x + radius * Math.cos(bottomArc.start);
      const startY = center.y + radius * Math.sin(bottomArc.start);
      const angle1 = (1/Math.atan2(startY, startX)) / 2;
      const arrowhead1X1 = startX - arrowSize * Math.cos(angle1 - theta);
      const arrowhead1Y1 = startY - arrowSize * Math.sin(angle1 - theta);
      const arrowhead2X1 = startX - arrowSize * Math.cos(angle1 + theta);
      const arrowhead2Y1 = startY - arrowSize * Math.sin(angle1 + theta);

      context.beginPath();
      context.arc(
        center.x, 
        center.y, 
        GameObject.Size / 2, topArc.start, topArc.end, true
      );

      
      context.strokeStyle = color;
      context.stroke();

      this.renderArrowHead(context, center, radius, topArc.start);

      context.strokeStyle = color;
      context.stroke();



      context.beginPath();
      context.arc(
        center.x, 
        center.y, 
        GameObject.Size / 2, bottomArc.start, bottomArc.end
      );

      context.strokeStyle = color;
      context.stroke();

      this.renderArrowHead(context, center, radius, bottomArc.end);


      context.strokeStyle = color;
      context.stroke();


      context.beginPath()
      context.ellipse(
        this._position.x + GameObject.Size / 2,
        this._position.y + GameObject.Size / 2,
        this._requiredLaserSize, this._requiredLaserSize,
        0, 0, Math.PI * 2
      )

      context.fillStyle = color;
      context.fill()
    
      
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
  