class Piston extends GameObject {
    constructor(position = {x: 0, y: 0}) {
        super(position);
        this._rotation = 0;
    }


    _createHeadPath() {
        let path = [];

        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4 + GameObject.Size / 4, 
            y: this._position.y
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4 + GameObject.Size / 4, 
            y: this._position.y + GameObject.Size
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size
        })

        return path;

    }

    _createShaftPath() {
        let path = [];

        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size / 2 - 5
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size / 2 - 5
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size / 2 - 5 + 10
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size / 2 - 5 + 10
        })

        return path;
    }

    _createBasePath() {

        let path = [];

        path.push({
            x: this._position.x, 
            y: this._position.y
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y
        });
        path.push({
            x: this._position.x + GameObject.Size * 3 / 4, 
            y: this._position.y + GameObject.Size
        });
        path.push({
            x: this._position.x, 
            y: this._position.y + GameObject.Size
        })

        return path;
    }


    /**
     * render()
     * @description renders the piston
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    render(context) {
        let headPath = this._createHeadPath();
        let basePath = this._createBasePath();
        let shaftPath = this._createShaftPath();

        // rotate all the points according to their rotation
        headPath = rotatePoints(headPath, this._rotation, {
            x: this._position.x + GameObject.Size / 2,
            y: this._position.y + GameObject.Size / 2
        })

        basePath = rotatePoints(basePath, this._rotation, {
            x: this._position.x + GameObject.Size / 2,
            y: this._position.y + GameObject.Size / 2
        })

        shaftPath = rotatePoints(shaftPath, this._rotation, {
            x: this._position.x + GameObject.Size / 2,
            y: this._position.y + GameObject.Size / 2
        })


        // extend the pistion if it is activated 
        if(this._activated) {
            let translation = {x: 0, y: 0};
            if(this._rotation === 0) {
                translation.x = Slot.Size;
            } else if(this._rotation === 90) {
                translation.y = Slot.Size;
            } else if(this._rotation === 180) {
                translation.x = -Slot.Size;
            } else if(this._rotation === 270) {
                translation.y = -Slot.Size;
            }

            headPath = translatePoints(headPath, translation); // translate the head

            // extend the shaft
            shaftPath[1] = translatePoint(shaftPath[1], translation);
            shaftPath[2] = translatePoint(shaftPath[2], translation);
        }


        // draw the piston

        // draw the shaft 
        context.beginPath();
        for(var i = 0; i < shaftPath.length; i++) {
            if(i == 0) {
                context.moveTo(shaftPath[i].x, shaftPath[i].y);
            } else {
                context.lineTo(shaftPath[i].x, shaftPath[i].y);
            }
        }

        context.fillStyle = "brown";
        context.fill();

        // draw the base
        context.beginPath();
        for(var i = 0; i < basePath.length; i++) {
            if(i == 0) {
                context.moveTo(basePath[i].x, basePath[i].y);
            } else {
                context.lineTo(basePath[i].x, basePath[i].y);
            }
        }
        context.fillStyle = "grey";
        context.fill();


        // draw the head
        context.beginPath();
        for(var i = 0; i < headPath.length; i++) {
            if(i == 0) {
                context.moveTo(headPath[i].x, headPath[i].y);
            } else {
                context.lineTo(headPath[i].x, headPath[i].y);
            }
        }

        context.fillStyle = "brown";
        context.fill();
         
    }




    /**
     * update()
     * @description updates the rotator 
     * @param {Grid} grid the grid that this rotator is on
     * @param {Point} pointer the location on the grid of the rotator
     */
    update(grid, pointer) {
        //console.log("state changed", this._activated);
        if(grid.getCellState(pointer.x, pointer.y)) {
        // move over all the blocks in front of the piston by one block

        // check if the blocks can be moved first

        // go through each block to the right of the piston until you find either 
        // the end or an empty block
        // if you find the end break
        // otherwise push the blocks over 
        if(this._rotation === 0) {
            grid.shiftRight(pointer.x, pointer.y);
        } else if(this._rotation === 90) {
            grid.shiftDown(pointer.y, pointer.x);
        } else if(this._rotation === 180) {
            grid.shiftLeft(pointer.x, pointer.y);
        } else if(this._rotation === 270) {
            grid.shiftUp(pointer.y, pointer.x);
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
        this._needsUpdate = false;
        return null;
    }
  
  
    /**
     * getNextDirections()
     * @description gets the directions from this node
     * @param {Direction} direction the current direction the laser is coming from
     * @returns {Array[Direction]} an array of the directions the laser will go to 
     */
    getNextDirections(direction) {
        return [Direction.Stop];
    }

    /**
     * getPreviousDirections()
     * @description gets the directions from this node
     * @param {Direction} direction the current direction
     * @returns {Array[Direction]} the previous directions
     */
    getPreviousDirections(direction) {
        return [];
    }


    /**
     * place()
     * @description places a rotator game object
     * @param {Grid} grid the grid that the Rotator is placed on
     * @param {Point} pointer the point the Rotator is placed at 
     */
    place(grid, pointer) {
        this.activate();
    }
    

    rotate(angle) {
        this._rotation = (angle + this._rotation) % 360;
    }


    /**
     * clone()
     * @description clones the Block
     * @returns {Block} a clone of the Block
     */
    clone() {
        let newPiston = new Piston();
        newPiston._position = this._position;
        newPiston._rotation = this._rotation;
        newPiston._activated = this._activated;
  
        return newPiston;
      }
}