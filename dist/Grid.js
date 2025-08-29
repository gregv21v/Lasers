
class Grid {
  
    /**
      constructor()
      @description constructs the Inventory
      @param manager the inventory manager
      @param rows the rows of this inventory
      @param columns the columns of this inventory
    */
    constructor(position, player, manager, rows, columns) {
      this._position = position;
      this._slots = [];
      this._rows = rows;
      this._columns = columns;
      this._selectedSlot = null;
      this._inventoryManager = manager;
      this._player = player;
  
  
      // determines if you can move objects
      // from one slot to another in the inventory
      this._active = true;
      this._onRightClickEnabled = true;
      this._emitters = [];

      this._currentLaserMatrix = new Matrix(this._rows, this._columns); // the matrix representing the slots with active lasers in them
      this._previousLaserMatrix = new Matrix(this._rows, this._columns); // the matrix representing the slots which previously had active lasers in them
      this._laserWidthMatrix = new Matrix(this._rows, this._columns); // the matrix of the widths of the lasers


      this._createSlots();
    }

    /**
     * findEmitters()
     * @description finds all the positions of all the emitters in the grid
     * @returns the positions of all the emitters in the grid
     */
    findEmitters() {
      let emitters = [];
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          var slot = this._slots[x][y]
          if(slot && slot.item instanceof Emitter) {
            emitters.push({
              x, y
            })
          } 
        }
      }
      return emitters;
    }


    /**
     * shiftRight()
     * @description shifts the items in a row right starting at start all the way down to 
     *  the first empty slot
     * @param {Integer} start the start index in the row
     * @param {Integer} rowIndex the row index 
     */
    shiftRight(start, rowIndex) {
      let emptySlot = this.findLastEmptySlotInRow(start, Direction.Right, rowIndex);

      if(emptySlot) {
        for(let j = emptySlot-1; j > start; j--) {
          let slot = this.getSlotAt(j, rowIndex);
          let emptySlot = this.getSlotAt(j+1, rowIndex);
          emptySlot.addItem(slot.item);
          emptySlot.item.update(this, emptySlot.coordinate);
          slot.removeItem();
        }
      }
    }


    /**
     * shiftLeft()
     * @description shifts the items in a row left starting at start all the way down to 
     *  the first empty slot
     * @param {Integer} start the start index in the row
     * @param {Integer} rowIndex the row index 
     */
    shiftLeft(start, rowIndex) {
      let emptySlot = this.findLastEmptySlotInRow(start, Direction.Left, rowIndex);

      if(emptySlot) {
        for(let j = emptySlot; j < start-1; j++) {
          let slot = this.getSlotAt(j+1, rowIndex);
          let emptySlot = this.getSlotAt(j, rowIndex);
          emptySlot.addItem(slot.item);
          emptySlot.item.update(this, emptySlot.coordinate);
          slot.removeItem();
        }
      }
    }


    /**
     * shiftDown()
     * @description shifts the items in a column down starting at start all the way down to 
     *  the first empty slot
     * @param {Integer} start the start index in the column to shift
     * @param {Integer} columnIndex the column index 
     */
    shiftDown(start, columnIndex) {
      let emptySlot = this.findLastEmptySlotInColumn(start, Direction.Down, columnIndex);
      console.log(emptySlot);

      if(emptySlot) {
        for(let j = emptySlot-1; j > start; j--) {
          let slot = this.getSlotAt(columnIndex, j);
          let emptySlot = this.getSlotAt(columnIndex, j+1);
          emptySlot.addItem(slot.item);
          emptySlot.item.update(this, emptySlot.coordinate);
          slot.removeItem();
        }
      }
    }


    /**
     * shiftUp()
     * @description shifts the items in a row up starting at start all the way up to 
     *  the first empty slot
     * @param {Integer} start the start index in the column to shift
     * @param {Integer} columnIndex the index of the column to shift 
     */
    shiftUp(start, columnIndex) {
      let emptySlot = this.findLastEmptySlotInColumn(start, Direction.Up, columnIndex);
      console.log(emptySlot);

      if(emptySlot) {
        for(let j = emptySlot; j < start-1; j++) {
          let slot = this.getSlotAt(columnIndex, j+1);
          let emptySlot = this.getSlotAt(columnIndex, j);
          emptySlot.addItem(slot.item);
          emptySlot.item.update(this, emptySlot.coordinate);
          slot.removeItem();
        }
      }
    }

    /**
     * pullLeft()
     * @description pulls an item one space to the left
     * @param {Integer} start the start index in the column to pull
     * @param {Integer} rowIndex the index of the row to pull
     */
    pullLeft(start, rowIndex) {
      let slot = this.getSlotAt(start, rowIndex);
      let nextSlot = (start+1 < this._columns) ? this.getSlotAt(start+1, rowIndex) : null;
      let emptySlot = this.getSlotAt(start-1, rowIndex);

      if(emptySlot && emptySlot.isEmpty() && slot && !slot.isEmpty()) { 
        emptySlot.addItem(slot.item);
        slot.removeItem();
        if(nextSlot && nextSlot.item && nextSlot.item instanceof StickyPiston) 
          this.pullWith(rowIndex, start, Direction.Left);
      }
      
    }

    /**
     * pullRight()
     * @description pulls an item one space to the right
     * @param {Integer} start the start index in the column to pull
     * @param {Integer} rowIndex the index of the row to pull
     */
    pullRight(start, rowIndex) {
      let slot = this.getSlotAt(start, rowIndex);
      let nextSlot = (start-1 >= 0) ? this.getSlotAt(start-1, rowIndex) : null;
      let emptySlot = this.getSlotAt(start+1, rowIndex);

      if(emptySlot && emptySlot.isEmpty() && slot && !slot.isEmpty()) {
        emptySlot.addItem(slot.item);
        slot.removeItem();
        if(nextSlot && nextSlot.item && nextSlot.item instanceof StickyPiston) 
          this.pullWith(rowIndex, start, Direction.Right);
      }
    }

    /**
     * pullUp()
     * @description pulls an item one space up
     * @param {Integer} start the start index in the column to pull
     * @param {Integer} columnIndex the index of the column to pull
     */
    pullUp(start, columnIndex) {
      let slot = this.getSlotAt(columnIndex, start);
      let nextSlot = (start+1 < this._rows) ? this.getSlotAt(columnIndex, start+1) : null;
      let emptySlot = this.getSlotAt(columnIndex, start-1);

      if(emptySlot && emptySlot.isEmpty() && slot && !slot.isEmpty()) { 
        emptySlot.addItem(slot.item);
        slot.removeItem();
        if(
            nextSlot && nextSlot.item && 
            nextSlot.item instanceof StickyPiston
        ) 
          this.pullWith(columnIndex, start, Direction.Up);
      }
    }

    /**
     * pullDown()
     * @description pulls an item one space down
     * @param {Integer} start the start index in the row to pull
     * @param {Integer} columnIndex the index of the column to pull
     */
    pullDown(start, columnIndex) {
      let slot = this.getSlotAt(columnIndex, start);
      let nextSlot = (start-1 >= 0) ? this.getSlotAt(columnIndex, start-1) : null;
      let emptySlot = this.getSlotAt(columnIndex, start+1);

      if(emptySlot && emptySlot.isEmpty() && slot && !slot.isEmpty()) {
        emptySlot.addItem(slot.item);
        slot.removeItem();
        if(
            nextSlot && nextSlot.item && 
            nextSlot.item instanceof StickyPiston 
        ) 
          this.pullWith(columnIndex, start, Direction.Down);
      }
    }


    /**
     * pullWith()
     * @description pulls an item in the given direction
     * @param {Integer} x the x coordinate of the item to pull
     * @param {Integer} y the y coordinate of the item to pull
     * @param {Direction} direction the direction to pull the item
     */
    pullWith(x, y, direction) {
      if(direction === Direction.Right) {
        this.pullRight(y - 1, x);
      } else if(direction === Direction.Left) {
        this.pullLeft(y + 1, x);
      } else if(direction === Direction.Down) {
        this.pullDown(y - 1, x);
      } else if(direction === Direction.Up) {
        this.pullUp(y + 1, x);
      }
    }
    


    /**
     * findLastEmptySlotInRow()
     * @description Finds the last empty slot in a row
     * @param {Integer} start the index to start searching at
     * @param {Direction} direction the direction to search in
     * @param {Integer} rowIndex the index of the row
     * @returns {Integer} the index of the last empty slot or null if none is found
     */
    findLastEmptySlotInRow(start, direction, rowIndex) {
      let i = start;
      if(direction === Direction.Right) {
        while(i < this._columns) {
            if(!this.getSlotAt(i, rowIndex).item) {
                console.log(this.getSlotAt(i, rowIndex));
                return i;
            }
            i++;
        }
      } else {
        while(i >= 0) {
            if(!this.getSlotAt(i, rowIndex).item) {
                console.log(this.getSlotAt(i, rowIndex));
                return i;
            }
            i--;
        }
      }

      return null;
    }


    /**
     * findLastEmptySlotInColumn()
     * @description Finds the last empty slot in a column
     * @param {Integer} start the index to start searching at
     * @param {Direction} direction the direction to search in
     * @param {Integer} columnIndex the index of the column
     * @returns {Integer} the index of the last empty slot or null if none is found
     */
    findLastEmptySlotInColumn(start, direction, columnIndex) {
      let i = start;
      if(direction === Direction.Down) {
        while(i < this._rows) {
            if(!this.getSlotAt(columnIndex, i).item) {
                return i;
            }
            i++;
        }
      } else {
        while(i >= 0) {
            if(!this.getSlotAt(columnIndex, i).item) {
                return i;
            }
            i--;
        }
      }

      return null;
    }


    
    /**
     * getNextSlot()
     * @param {Point} pointer the pointer to the current position of the laser
     * @param {Direction} direction the direction the laser is going
     */
    getNextSlot(pointer, direction) {
      // choose the direction the emitter goes
      // and update the pointer accordingly.
      if(direction === Direction.Right) {
        return {x: pointer.x + 1, y: pointer.y}
      } else if(direction === Direction.Left) {
        return {x: pointer.x - 1, y: pointer.y}
      } else if(direction === Direction.Down) {
        return {x: pointer.x, y: pointer.y + 1}
      } else if(direction === Direction.Up) {
        return {x: pointer.x, y: pointer.y - 1}
      } else if(direction === Direction.Stop) {
        return {x: pointer.x, y: pointer.y}
      }
    }


    /**
     * getNextDirection()
     * @description get the next direction the laser will go
     * @param {Direction} direction the direction the laser is going
     * @param {Slot} slot the slot the laser is currently in
     * @return {Direction} the next direction
     */ 
    getNextDirection(direction, slot) {
      if(slot.item) {
        return slot.item.getNextDirections(direction);
      } else {
        return direction;
      }
    }
    
    /**
     * getAdjacentSlots()
     * @param {Number} x the x coordinate of the slot 
     * @param {Number} y the y coordinate of the slot   
     * @returns all the adjacent slots to the given slot  
     */
    getAdjacentSlots(x, y) {
      let positions = [
        {x: x - 1, y: y - 1},
        {x: x - 1, y},
        {x: x - 1, y: y + 1},
        {x, y: y + 1},
        {x: x + 1, y: y + 1},
        {x: x + 1, y},
        {x: x + 1, y: y - 1},
        {x, y: y - 1}
      ];

      let slots = [];

      for (const pos of positions) {
        if(this.pointInGrid(pos)) {
          slots.push(this.getSlotAt(pos.x, pos.y))
        }
      }


      return slots;
    }

    /**
     * @description checks if a given point is in the grid
     */
    pointInGrid(point) {
      return (
        point.x >= 0 && point.x < this._columns && 
        point.y >= 0 && point.y < this._rows
      )
    }

    

   

    /**
     * @description emmits a beam from a point 
     */
    emitBeam(startNode) {

      // store the path that the beam makes so that it can be updated later.
      // each node of the path is setup like follows:
      // {
      //    point: the position of this node 
      //    direction: the direction this node will go 
      //    color: the color of the line protruding from this node
      //    width: the width of the line protruding from this node
      //    children: the children of this node
      // }

      // base case 
      if(startNode === null) {
        return null;
      }

      let slot = this._slots[startNode.point.x][startNode.point.y]; // get the current slot the emitter is in

      // other cases
      // if the slot contains an item
      if(slot && slot.item && !(slot.item instanceof Emitter)) {
        //slot.item.inDirection = startNode.direction; // set the in direction
        
        let children = slot.item.getNextNode(this, startNode);

        
        if(children) { 
          startNode.children = startNode.children.concat(children);
        }

        for (const child of startNode.children) {
          this.emitBeam(child);
        }
        

      } else {
        let nextPoint = this.getNextSlot(startNode.point, startNode.direction);

        if(this.pointInGrid(nextPoint)) {
          let child = {
            ...startNode,
            point: {...nextPoint},
            children: []
          }

          startNode.children = [child];
          this.emitBeam(child);
        } else {
          startNode.children = [];
          return startNode;
        }
      }

      return startNode;
    }



    /**
     * @description emits a laser from a emitter
     * @param {CanvasRenderingContext2D} context the context to render the laser to  
     */
    projectAllLasers() {
      let emitters = this.findEmitters(); // finds all the emitters in the grid
      let rootNodes = [];

      for (const emitter of emitters) {
        rootNodes = rootNodes.concat(this.projectLaser(emitter));
      }

      // if a change is detected,
      this._previousLaserMatrix = this._currentLaserMatrix;
      this._currentLaserMatrix = new Matrix(this._rows, this._columns);

      this._previousLaserWidthMatrix = this._laserWidthMatrix;
      this._laserWidthMatrix = new Matrix(this._rows, this._columns);


      // update the matrices with the new lasers
      for (const node of rootNodes) {
        // update the laser matrices 
        // only update the previous laser matrix if the state changes 
        this.updateMatrix(this._currentLaserMatrix, node);
        this.updateMatrixWidths(this._laserWidthMatrix, node);
      }

      let xorMatrix = this._currentLaserMatrix.xorWith(this._previousLaserMatrix);
      let xorMatrixWidths = this._laserWidthMatrix.xorWith(this._previousLaserWidthMatrix);
      
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          if(this._slots[x][y].item) {
            if(xorMatrix.getAt(x, y) || xorMatrixWidths.getAt(x, y)) { // if a cell has changed state
              this._slots[x][y].item.stateChanged = true; 
              this._slots[x][y].item.toggle();
            } else { // a cell stayed the same
              this._slots[x][y].item.stateChanged = false;
            }
          }

        }
      }
      this.updateSlots();
      return rootNodes;
    }

    /**
     * @description updates the slots
     */
    updateSlots() {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          if(this._slots[x][y].item)
            if(this._slots[x][y].item.stateChanged || this._slots[x][y].item.isTimed)
              this._slots[x][y].item.update(this, {x, y});
        }
      }
    }



    updateSlot(coordinate) {
      if(this._currentLaserMatrix.getAt(coordinate.x, coordinate.y)) {
        this._slots[coordinate.x][coordinate.y].item.stateChanged = true;
        this._slots[coordinate.x][coordinate.y].item.place(this, coordinate);
        this._slots[coordinate.x][coordinate.y].item.update(this, coordinate);
      }
    }

    


    /**
     * @description emits a laser from a emitter
     * @param {CanvasRenderingContext2D} context the context to render the laser to  
     */
    projectLaser(emitter) {

      let slot = this._slots[emitter.x][emitter.y];
      let direction = slot.item.direction;
      let root = {
        point: emitter, 
        direction,
        color: "red",
        width: 1,
        children: []
      }
      this.emitBeam(root);

      return root;
    }

    /**
     * updateMatrix()
     * @description updates the matrix from a root node 
     * @param {*} matrix 
     * @param {*} node 
     */
    updateMatrix(matrix, node) {
      matrix.setAt(node.point.x, node.point.y, 1);
      for (const child of node.children) {
          matrix.setAt(child.point.x, child.point.y, 1);
          this.updateMatrix(matrix, child);
      }

    }


    /**
     * updateMatrixWidths()
     * @description updates width matrix for the given node
     * @param {Matrix} matrix the matrix to update
     * @param {Node} node the node of the laser beam
     */
    updateMatrixWidths(matrix, node) {
      matrix.setAt(node.point.x, node.point.y, node.width);
      for (const child of node.children) {
          matrix.setAt(child.point.x, child.point.y, node.width);
          this.updateMatrixWidths(matrix, child);
      }
    }




    getCellState(x, y) {
      return this._currentLaserMatrix.getAt(x, y);
    }


    getCellPreviousState(x, y) {
      return this._previousLaserMatrix.getAt(x, y);
    }
    



    
    /**
     * @description clears the grid of all items
     * @returns 
     */
    clear() {
      this._currentLaserMatrix = new Matrix(this._rows, this._columns); // the matrix representing the slots with active lasers in them
      this._previousLaserMatrix = new Matrix(this._rows, this._columns); // the matrix representing the slots which previously had active lasers in them

      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          this._slots[x][y].removeItem();
          this._slots[x][y].isFixed = false;
        }
      }
    }


    /**
     * reset()
     * @description resets the grid
     */
    reset() {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          let slot = this._slots[x][y];
          if(slot.item && (slot.item instanceof Target || slot.item instanceof Rotator)) {
            if(slot.item.isActivated()) slot.item.deactivate();
          } 
        }
      }
    }
  
  
    /**
     * findSlotContainingPoint()
     * @description find the slot that contains a given point
     * @param {Point} point the point to check for
     */
    findSlotContainingPoint(point)  {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          var slot = this._slots[x][y]
          if(slot.contains(point)) {
            return slot;
          }
        }
      }
      return null;
    }
  

  
    /**
      _createSlots()
      @description create all the _slots for the storage
    */
    _createSlots() {
      for (var x = 0; x < this._columns; x++) {
        let newRow = []
        for (var y = 0; y < this._rows; y++) {
          let newSlot = new Slot(
            this._player,
            this,
            {
              x: this._position.x + Slot.Size * x,
              y: this._position.y + Slot.Size * y
            },
            { x, y }
          )
          newRow.push(newSlot)
        }
        this._slots.push(newRow);
      }
    }


    
  
    /********************************************************
                      Getters and Setters
    *********************************************************/
  
    /**
     * get layers
     * @description gets the graphics layers of the inventory
     */
    get layers() {
      return this._svg.layers;
    }
  
    /**
     * get onRightClickEnabled
     * @description get onRightClickEnabled
     */
    get onRightClickEnabled() {
      return this._onRightClickEnabled;
    }
  
    /**
     * set onRightClickEnabled
     * @description set onRightClickEnabled
     * @param value the value to set the onRightClickEnabled field to
     */
    set onRightClickEnabled(value) {
      this._onRightClickEnabled = value;
    }
  
    /**
      get width
      @description gets the width of the inventory
    */
    get width() {
      return Slot.size * this._columns
    }
  
    /**
      get height
      @description gets the height of the inventory
    */
    get height() {
      return Slot.size * this._rows
    }
  
    /**
      get currentlySelected
      @description get the currently selected slot
    */
    get currentlySelected() {
      return this._selectedSlot;
    }
  
    /**
      get itemsMoveable
      @description gets whether the items are movable
    */
    get itemsMovable() {
      return this._itemsMovable;
    }
  
    /**
      set itemsMoveable
      @description gets whether the items are movable
    */
    set itemsMovable(value) {
      this._itemsMovable = value;
    }
  
    /**
      get active
      @description gets whether the items are active
    */
    get active() {
      return this._active;
    }

    get rows() {
      return this._rows;
    }

    get columns() {
      return this._columns;
    }
  
    /**
      activate
      @description activate the inventory
    */
    activate() {
      this._active = true;
    }
  
    /**
      deactivate
      @description deactivate the inventory
    */
    deactivate() {
      this._active = false;
    }
  
  
  
  
  
  
    /**
      moveTo()
      @description moves the storage to a new position
      @param position position to move to
    */
    moveTo(position) {
      for (var x = 0; x < this._slots.length; x++) {
        for (var y = 0; y < this._slots[x].length; y++) {
          this._slots[x][y].position = {
            x: position.x + Slot.size * x,
            y: position.y + Slot.size * y
          }
        }
      }
    }
  
    /**
      add()
      @description adds an item to the first available slot in the
        storage container.
      @param item the item to add
    */
    add(item) {
      // find the first available slot and place the item there
      for (var x = 0; x < this._slots.length; x++) {
        for (var y = 0; y < this._slots[x].length; y++) {
          if(this._slots[x][y].isEmpty()) {
            this._slots[x][y].addItem(item);
            return true;
          }
        }
      }
      return false;
    }

  
    /**
      getClosestSlot()
      @description get the closest slot to the given unit
      @param unit the unit to find the closest slot to
    */
    getClosestSlot(item) {
      var distance = this._slots[0][0].distanceTo(item);
      var closestSlot = this._slots[0][0];
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          var tempDistance = this._slots[x][y].distanceTo(item)
          if(tempDistance <= distance) {
            distance = tempDistance;
            closestSlot = this._slots[x][y];
          }
        }
      }
      return closestSlot;
    }
  
    /**
      snapToClosestSlot()
      @description snap a given item to the closest slot
      @param item the item to snap to the closest slot
    */
    snapToClosestSlot(item) {
      var closestSlot = this.getClosestSlot(item)
      this.addItemToSlot(closestSlot, item)
    }
  
  
    /**
      addItemToSlot()
      @description adds a item to a specified slot
      @param slot the slot to add the item to
      @param item the item to add
    */
    addItemToSlot(slot, item) {
      slot.addItem(item);
    }
  
    /**
     * removeItemFromSlot()
     * @description removes an item from a given slot 
     * @param slot the slot to remove the item from
     */
    removeItemFromSlot(slot) {
      slot.removeItem()
    }
  

    
  
  
    /********************************************************
                      Graphics
    *********************************************************/
  
    renderLine(context, parent, child) {
      if(parent && child) {
        let parentSlot = this.getSlotAt(parent.point.x, parent.point.y);
        let childSlot = this.getSlotAt(child.point.x, child.point.y);
        context.beginPath();
        context.moveTo(parentSlot.center.x, parentSlot.center.y);
        context.lineTo(childSlot.center.x, childSlot.center.y);
        context.lineWidth = parent.width;
        context.strokeStyle = parent.color;
        context.stroke();

        context.lineWidth = 1;
      }
    }

    renderLaserNode(context, node) {
      for (const child of node.children) {
        this.renderLine(context, node, child);
        this.renderLaserNode(context, child);
      }
    }
                  
  
    /**
     * render()
     * @description renders the grid
     */
    render(context) {
      // render the slots themselves
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          this._slots[x][y].render(context)
        }
      }

      // render the GameObjects in the slots
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          if(this._slots[x][y].item) {
            this._slots[x][y].item.render(context)
          }
        }
      }

      for (const emitter of this._emitters) {
        this.renderLaserNode(context, emitter);
      }
    }
  
    /**
      delete()
      @description delete the svg for this storage
    */
    delete() {
      this._svg.group.remove()
    }
  
  
    /**
      deselectAll()
      @description deselect all the items in the storage
    */
    deselectAll() {
      for (var x = 0; x < this._slots.length; x++) {
        for (var y = 0; y < this._slots[x].length; y++) {
          this._slots[x][y].deselect();
        }
      }
    }
  
    /**
      select()
      @description selects a given slot of this storage
      @param slot slot to be selected
    */
    select(slot) {
      this._selectedSlot = slot;
      this._selectedSlot.attach(this._svg.layers.slots);
      if(this._selectedSlot.item) {
        this._selectedSlot.item.attach(this._svg.layers.items);
      }
      this._selectedSlot.select();
    }
  
  
  
    /**
      useSelectedItem()
      @description use the selected item
    */
    useSelectedSlot() {
      this._selectedSlot.useSlot();
    }


    getSlotAt(x, y) {
      return this._slots[x][y];
    }


    
    getLaserWidthAt(x, y) {
      if(this._laserWidthMatrix) {
        return this._laserWidthMatrix.getAt(x, y);
      } else {
        return 0;
      }
    }

    

    addToCoder(coder, isToolbar) {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          let slot = this._slots[x][y];
          if(slot.item) {
            coder.addObject(slot.item.constructor.name, {x, y}, slot.item.rotation, isToolbar);
          }
        }
      }
    }
  }
  