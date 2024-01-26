class InfiniteSlot extends Slot {
  
    /**
      constructor()
      @description constructs the slot
    */
    constructor(player, grid, position, coordinate) {
      super(player, grid, position, coordinate);
    }

  
    /**
      removeItem()
      @description removes the item from this slot
    */
    removeItem() {
      if(this._item)
        this._item = this._item.clone();
    }
  }
  