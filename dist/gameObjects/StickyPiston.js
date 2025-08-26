class StickyPiston extends GameObject {
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

        context.fillStyle = "green";
        context.fill();
         
    }




    /**
     * update()
     * @description updates the rotator 
     * @param {Grid} grid the grid that this rotator is on
     * @param {Point} pointer the location on the grid of the StickyPiston
     */
    update(grid, pointer) {
        
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
            this.activate();

          } else {
            // retract the piston
            if(this._rotation === 0) {
                grid.pullLeft(pointer.x + 2, pointer.y);
            } else if(this._rotation === 90) {
                grid.pullUp(pointer.y + 2, pointer.x);
            } else if(this._rotation === 180) {
                grid.pullRight(pointer.x - 2, pointer.y);
            } else if(this._rotation === 270) {
                grid.pullDown(pointer.y - 2, pointer.x);
            }

            this.deactivate();
          }
        
    }

    

    /**
     * move()
     * @description moves the piston 
     * @param {Grid} grid the grid that this piston is on
     * @param {Point} pointer the location on the grid of the piston
     */
    move(grid, destination) {
        if(this._activated) {
            if(this._rotation === 0) {
                grid.pullLeft(destination.x + 2, destination.y);
            } else if(this._rotation === 90) {
                grid.pullUp(destination.y + 2, destination.x);
            } else if(this._rotation === 180) {
                grid.pullRight(destination.x - 2, destination.y);
            } else if(this._rotation === 270) {
                grid.pullDown(destination.y - 2, destination.x);
            }
        } else {
            if(this._rotation === 0) {
                grid.pullLeft(destination.x + 1, destination.y);
            } else if(this._rotation === 90) {
                grid.pullUp(destination.y + 1, destination.x);
            } else if(this._rotation === 180) {
                grid.pullRight(destination.x - 1, destination.y);
            } else if(this._rotation === 270) {
                grid.pullDown(destination.y - 1, destination.x);
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
        this.update(grid, pointer);
    }

    /**
     * getDirection()
     * @description gets the direction the piston is facing 
     * @returns {Direction} the direction the piston is facing
     **/
    getDirection() {
        if(this._rotation === 0) {
            return Direction.Right;
        } else if(this._rotation === 90) {
            return Direction.Down;
        } else if(this._rotation === 180) {
            return Direction.Left;
        } else if(this._rotation === 270) {
            return Direction.Up;
        } else {
            return Direction.Stop;
        }
    }


    /**
     * isFacing()
     * @description checks if this piston is facing another piston
     * @param {StickyPiston} otherPiston the other piston to check
     * @returns {boolean} true if the pistons are facing each other
     */
    isFacing(otherPiston) {
        if(this._rotation === 0 && otherPiston.rotation === 180) {
            return true;
        } else if(this._rotation === 90 && otherPiston.rotation === 270) {
            return true;
        } else if(this._rotation === 180 && otherPiston.rotation === 0) {
            return true;
        } else if(this._rotation === 270 && otherPiston.rotation === 90) {
            return true;
        }

        return false;
    }
    

    rotate(angle) {
        this._rotation = (angle + this._rotation) % 360;
    }

    get rotation() {
        return this._rotation;
    }




    /**
     * clone()
     * @description clones the Block
     * @returns {Block} a clone of the Block
     */
    clone() {
        let newPiston = new StickyPiston();
        newPiston._position = this._position;
        newPiston._rotation = this._rotation;
        newPiston._activated = this._activated;
  
        return newPiston;
      }
}