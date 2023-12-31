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
     * getNextSlot()
     * @param {Point} pointer the pointer to the current position of the laser
     * @param {Direction} direction the direction the laser is going
     */
    getNextSlot(pointer, direction) {

      // choose the direction the emitter goes
      // and update the pointer accordingly.
      if(direction === "right") {
        return {x: pointer.x + 1 , y: pointer.y}
      } else if(direction === "left") {
        return {x: pointer.x - 1, y: pointer.y}
      } else if(direction === "down") {
        return {x: pointer.x, y: pointer.y + 1}
      } else if(direction === "up") {
        return {x: pointer.x, y: pointer.y - 1}
      }
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
    emitBeam(emitter, direction, color) {

      context.lineWidth = 1;
      context.beginPath();
      
      let currentSlot = this._slots[emitter.x][emitter.y]; // get the current slot the emitter is in
      context.moveTo(currentSlot.center.x, currentSlot.center.y); // move the laser start position to the beam emitter
      let currentDirection = direction; // the emitters current direction
      let pointer = {...emitter}; // the current position of the end of the beam
      let laserSize = 1;
      while(this.pointInGrid(this.getNextSlot(pointer, currentDirection))) {

        // update the direction of the laser based on the current block
        currentDirection = (currentSlot.item) ? currentSlot.item.updateDirection(currentDirection) : currentDirection
        pointer = this.getNextSlot(pointer, currentDirection);
        currentSlot = this._slots[pointer.x][pointer.y]; // set current slot
        context.lineTo(currentSlot.center.x, currentSlot.center.y); // draw a line to the current slot

        

        if(currentSlot.item instanceof Target) {
          if(currentSlot.item.requiredLaserSize === laserSize) {
            currentSlot.item.activate();
          }
          break; 
        } else if(currentSlot.item instanceof Lens) {
          context.strokeStyle = color;
          context.stroke()
          context.beginPath();
          context.moveTo(currentSlot.center.x, currentSlot.center.y);
          laserSize++;
          context.lineWidth = laserSize;
        } else if(currentSlot.item instanceof Block) {
          break;
        } else if(currentSlot.item instanceof BeamSplitter) {
          context.strokeStyle = color;
          context.stroke()
          for (const direction of currentSlot.item.getDirections(currentDirection)) {
            this.emitBeam(pointer, direction, "red");
          }

          context.beginPath();
          break;  
        }

      } 
      context.strokeStyle = color;
      context.stroke()

      context.lineWidth = 1;
    }


    /**
     * @description emits a laser from a emitter
     * @param {CanvasRenderingContext2D} context the context to render the laser to  
     */
    projectLaser(context) {
      let emitters = this.findEmitters(); // finds all the emitters in the grid

      
      for (const emitter of emitters) {
        var direction = this._slots[emitter.x][emitter.y].item.direction;
        this.emitBeam(emitter, direction, "red");
      }
    }

    /**
     * @description clears the grid of all items
     * @returns 
     */
    clear() {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          this._slots[x][y].removeItem();
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
     * get allowPickup()
     * @description gets the allow pickup property
     */
    get allowPickup() {
      return this._allowPickup;
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
                      JSON Function
    *********************************************************/
    /**
      toJSON()
      @description converts this storage to its json representation
    */
    toJSON() {
      let storageAsJSON = {
        columns: this._columns,
        rows: this._rows,
        slots: []
      }
      for (var x = 0; x < this._columns; x++) {
        var newRow = []
        for (var y = 0; y < this._rows; y++) {
          var newSlot = this._slots[x][y].toJSON()
          newRow.push(newSlot);
        }
        storageAsJSON.slots.push(newRow);
      }
      return storageAsJSON;
    }
  
    /**
      fromJSON()
      @description convert a json object to a storage object
    */
    static fromJSON(player, inventoryManager, json) {
      let inventory = new Grid(player, inventoryManager, json.rows, json.columns)
      for (var x = 0; x < inventory._columns; x++) {
        for (var y = 0; y < inventory._rows; y++) {
          inventory._slots[x][y].destroyItem()
          var item = ItemRegistry.itemFromJSON(json.slots[x][y].item);
          if(item !== null) {
            inventory._slots[x][y].addItem(
              item, inventory._svg.layers
            )
          }
        }
      }
      return inventory
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
     * getAllItemsByName() 
     * @description gets all the items by a certain name and put them into one stack
     * @param {string} name the name of the item
     */
    getAllItemsByName(name) {
      let item = ItemRegistry.lookup(name).clone()
      let self = this;
      item._svg.clickArea.on("click", (event) => self.itemOnLeftClick(event, item))
      item.quantity = 0;
      for (var x = 0; x < this._slots.length; x++) {
        for (var y = 0; y < this._slots[x].length; y++) {
          if(this._slots[x][y].item && this._slots[x][y].item.name === name) {
            item.quantity += this._slots[x][y].item.quantity
            this._slots[x][y].destroyItem()
            this.removeItemFromSlot(this._slots[x][y])
          }
        }
      }
  
      if(item.quantity === 0)
        return null;
      else 
        return item
    }
  
  
    /**
      onClick()
      @description the function called when this block is clicked
    */
    itemOnLeftClick(event, item) {
      if(this._itemsMovable) {
  
        let pos = d3.pointer(event);
  
        if(this._player.hand) { // there is something in the hand
          // place the item in the players hand into the designated slot
          if(
            this._inventoryManager.addToContainingSlot({
              x: pos[0], y: pos[1]
            }, this._player.hand)
          ) {
            //this._player.hand.destroy();
            this._player.removeItemFromHand();
            console.log("Slot clicked");
          } 
        } else {
          console.log("Hand empty");
          this._player.addItemToHand(item)
        }
      } 
    }
  
  
  
  
    /**
     * splitStack()
     * @description splits the items in a given stack
     * @param slot the slot that the item stack is in
     */
    splitStack(coordinate) {
      // find the closest empty slot
      var distance = Math.sqrt(
        Math.pow(window.innerHeight, 2) + Math.pow(window.innerHeight, 2)
      ); // size of the window across
      var closestSlot = null;
      var item = this._slots[coordinate.x][coordinate.y].item;
      if(item !== null) {
        for (var _x = 0; _x < this._columns; _x++) {
          for (var _y = 0; _y < this._rows; _y++) {
            var tempDistance = this._slots[_x][_y].distanceTo(item)
            if((_x !== coordinate.x && _y !== coordinate.y) && tempDistance <= distance) {
              distance = tempDistance;
              closestSlot = this._slots[_x][_y];
            }
          }
        }
      }
      var tempItem = item.clone()
      tempItem.quantity = Math.floor(item.quantity/2)
      item.quantity -= tempItem.quantity
  
      this.addItemToSlot(closestSlot, tempItem)
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
      slot.addItem(item, this._svg.layers);
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
  

  
    /**
     * render()
     * @param {Object} props the properties to render
     */
    render(context) {
      for (var x = 0; x < this._columns; x++) {
        for (var y = 0; y < this._rows; y++) {
          this._slots[x][y].render(context)
        }
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
     * selectSlotByPosition()
     * @description selects a slot by its position
     */
    selectSlotByPosition(x, y) {
      this.deselectAll();
  
      this._selectedSlot = this._slots[x][y];
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
  }
  