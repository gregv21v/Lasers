/**
 * PlayScene - the scene the player plays on
 */
class CreativeScene extends PlayableScene {
    constructor(game) {
        super(game)
        this._levels = [
            new CreativeLevel()
        ]
        this._toolbar = new InfiniteToolbar({
            x: this._toolbarPosition.x, 
            y: this._toolbarPosition.y + Slot.Size * 2
        }, this._game.player, this._manager)

        this._regularToolbar = new Toolbar({
            x: this._toolbarPosition.x,
            y: this._toolbarPosition.y - Slot.Size / 2
        }, this._game.player);
        this._gridManager.addGrid(this._regularToolbar);
        this._gridManager.addGrid(this._toolbar);

        this._saveBtn = new Button(
            { x: this._toolbarPosition.x - 100, y: this._toolbarPosition.y + Slot.Size * 2 },
            100, 40,
            "Save",
            () => {
                console.log("Save button clicked");
                
                let coder = new Coder();
                this._grid.addToCoder(coder, false);
                this._regularToolbar.addToCoder(coder, true);
                let code = coder.generateCode();

                // Create a Blob object with the text content
                const blob = new Blob([code], { type: 'text/plain' });

                // Create a temporary anchor element
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob); // Create a URL for the Blob
                anchor.download = 'level.txt'; // Set the default file name

                // Programmatically click the anchor to trigger the download
                anchor.click();

                // Clean up the URL object
                URL.revokeObjectURL(anchor.href);
            }
        )



    }


    /**
     * render()
     * @description renders this scene
     */
    render() {
        this._game.context.clearRect(0, 0, this._game.width, this._game.height);

        this._game.context.font = "15px Arial";
        this._game.context.fillStyle = "black";
        this._game.context.textAlign = "left";
        this._game.context.textBaseline = "top";
        this._game.context.fillText("Level: " + (this._currentLevel + 1), 25, 25)

        this._grid.render(this._game.context);
        this._toolbar.render(this._game.context);
        this._regularToolbar.render(this._game.context);

        if(this._game.player.hand) {
            this._game.player.hand.render(this._game.context);
        }

        for (const emitter of this._emitters) {
            this._grid.renderLaserNode(this._game.context, emitter);
        }

        this._saveBtn.render(this._game.context);
        
    }



    /**
     * onMouseDown()
     * @description called when the mouse button has been pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {
        let point = {
            x: event.clientX,
            y: event.clientY
        }
        super.onMouseDown(event);

        this._saveBtn.onClick(point);


    }
}