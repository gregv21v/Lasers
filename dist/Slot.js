class Slot {
    static Size = 40;
  
    /**
      constructor()
      @description constructs the slot
    */
    constructor(player, grid, position, coordinate) {
      this._coordinate = coordinate
      this._position = position;
      //this._inventoryManager = inventoryManager;
      this._grid = grid;
      this._item = null;
      this._player = player
      this._onMouse = false;
      this._isFixed = false;
    }


    /**
     * @description triggered when the state of slot changes
     */
    stateChange() {

    }
  
    
  
  
  
  
    /********************************************************
                      Graphics Methods
    *********************************************************/
  
    /**
      render()
      @description initialize the values for the _svg
    */
    render(context) {

      context.fillStyle = "white";
      context.fillRect(this._position.x, this._position.y, Slot.Size, Slot.Size);

      context.strokeStyle = "black";
      context.strokeRect(this._position.x, this._position.y, Slot.Size, Slot.Size);

      if(this._item)
        this._item.render(context);

    }
  

  
  
  
    /********************************************************
                      Getters and Setters
    *********************************************************/
  
    /**
      set position
      @description sets the _position of this slot
      @param _position the new _position of this slot
    */
    set position(position) {
      this._position = position
      if(this._item !== null) {
        this._item.position = {
          x: position.x + 5,
          y: position.y + 5
        }
      }
    }
  
    /**
      get position
      @description gets the _position of the slot
    */
    get position() {
      return this._position
    }

  
    /**
     * get item
     * @description gets the item of the slot
     */
    get item() {
      return this._item;
    }
  
  
    /**
      addItem()
      @description adds a unit for this slot
      @param item item to put in this slot
      @param layers the graphics layers
    */
    addItem(item) {
      if(!this._item) {
  
        // update the item
        this._item = item;
        this._item.position = {
          x: this.position.x + 5,
          y: this.position.y + 5
        }
      }
    }
  
    /**
      * consumeOne()
      * @description consumes one of the item in this slot
      */
    consumeOne(slot) {
      if(this._item.quantity > 1) {
        this._item.quantity -= 1;
      } else {
        this.destroyItem()
        this.removeItem()
      }
    }
  
    /**
     * replaceItem()
     * @description replace the item in this inventory
     * @param item the new item to replace the old one with
     */
    replaceItem(item) {
      console.log("Replacing item");
      this.destroyItem();
      this.addItem(item)
    }
  
    /**
      removeItem()
      @description removes the item from this slot
    */
    removeItem() {
      if(this._item) {
        this._item = null;
      }
    }
  
    /**
      destroyItem()
      @description removes the item and its graphic from the slot
    */
    destroyItem() {
      if(this._item) {
        this._item.destroy();
        this._item = null;
      }
    }
  
  
    /**
      distanceTo()
      @description returns the distance between the center of this
        slot and the center of a item
      @param item the item to find the distance to
    */
    distanceTo(item) {
      return Math.sqrt(
        Math.pow(item.position.x - this._position.x, 2) +
        Math.pow(item.position.y - this._position.y, 2)
      )
    }
  
    /**
     * contains()
     * @description check if this slot contains a given point
     * @param {Point} point the point to check for 
     */
    contains(point) {
      return (
        this._position.x < point.x && point.x < this._position.x + Slot.Size &&
        this._position.y < point.y && point.y < this._position.y + Slot.Size
      )
    }
  
    /**
      useSlot()
      @description use the item in this slot
    */
    useSlot() {
      if(this._item.quantity - 1 > 0) {
        this._item.quantity -= 1;
      } else {
        this.destroyItem()
      }
    }
  
    /**
      isEmpty()
      @description returns whether this slot is empty or not
    */
    isEmpty() {
      return this._item === null;
    }
  
  
  
    /**
      select()
      @description selects this slot of the inventory
    */
    select() {
      this._svg.background.style("stroke", "green")
      this._svg.background.style("stroke-width", 5)
    }
  
    /**
      deselect()
      @description deselects this slot of the inventory
    */
    deselect() {
      this._svg.background.style("stroke", "black")
      this._svg.background.style("stroke-width", 1)
    }
  
    /********************************************************
                     Mouse Interactions
    *********************************************************/
  
  
  
    /**
     * onDoubleClick()
     * @description the event that occures when an item or slot is double clicked
     */
    onDoubleClick(event) {
      console.log("Double Click");
      // add all the items of the clicks item to
      // your hand
      this._player.addItemToHand(this._inventory.getAllItemsByName(this._item.name));
    }
  
    /**
      onClick()
      @description the function called when this block is clicked
    */
    onClick(event) {
      if(this._inventory.itemsMovable) {
  
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
          this._player.addItemToHand(this._item)
          this._inventory.removeItemFromSlot(this)
        }
  
        
        
      } else {
        this._inventory.deselectAll()
        this._inventory.select(this)
        this.select()
      }
  
      // select this slot and only this slot of the inventory
      //this._inventory.clearContextMenus();
      
  
    }
  
    /**
      onMouseDown()
      @description the function called when the mouse is pressed down on the slot
    */
    onMouseDown() {
    }
  
    /**
      onMouseEnter()
      @description the function called when the mouse enters the button area
    */
    onMouseEnter() {
      this._svg.background.style("fill-opacity", 0.5)
    }
  
    /**
      onMouseLeave()
      @description the function called when the mouse enters the button area
    */
    onMouseLeave() {
      this._svg.background.style("fill-opacity", 1)
    }
  
    /**
     * get center()
     * @description gets the center of the slot
     */
    get center() {
      return {
        x: this._position.x + Slot.Size / 2,
        y: this._position.y + Slot.Size / 2
      }
    }


    set isFixed(value) {
      this._isFixed = value
    }

    get isFixed() {
      return this._isFixed;
    }
  

    get coordinate() {
      return this._coordinate;
    }
    
  }
  