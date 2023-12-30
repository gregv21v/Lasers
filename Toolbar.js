

class Toolbar extends Grid {
  /**
    constructor()
    @description constructs the toolbar
  */
  constructor(position, player, manager) {
    super(position, player, manager, 1, 10)
  }

  /**
   * fromJSON()
   * @description parses a JSON object to create a new toolbar
   */
  static fromJSON(player, inventoryManager, json) {
    let inventory = new Toolbar(player, inventoryManager, json.rows, json.columns)
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
}
