/**
 * GridManager - manages the different grids
 */
class GridManager {
    /**
         constructor()
        @description constructs the grid manager
    */
    constructor(game) {
        this._game = game;
        this._player = game.player;
        this._grids = [];
        this._lastPlacedSlot = {};
    }



    addGrid(grid) {
        this._grids.push(grid);
    }


    /**
     * onMouseDown()
     * @description called when the mouse button has been pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {
        // find the clicked game object
        let point = {
            x: event.clientX,
            y: event.clientY
        };
        let slot = null;
        let gridOfSlot = null;

        // find the slot that was clicked on
        for (const grid of this._grids) {
            slot = (slot) ? slot : grid.findSlotContainingPoint(point);
            gridOfSlot = (gridOfSlot) ? gridOfSlot : grid;
        }

        
        if(slot)
            if(!this._player.hand && !slot.isFixed) {
                this._player.hand = slot.item;
                this._player.hand.pickUp();
                slot.removeItem();
            } else if(slot.isEmpty()) {
                slot.addItem(this._player.hand)
                gridOfSlot.updateSlot(slot.coordinate);
                this._player.hand = null;
            }

        this._lastPlacedSlot = slot;
    }

    /**
     * onMouseMove()
     * @description called when the mouse has moved
     * @param {MouseEvent} event the mouse event
     */
    onMouseMove(event) {
        // move the what is in the players hand with the mouse
        if(this._player.hand) {
            this._game.player.hand.position = {
                x: event.clientX - GameObject.Size / 2,
                y: event.clientY - GameObject.Size / 2
            };
        }
    }


    get lastPlacedSlot() {
        return this._lastPlacedSlot;
    }
}