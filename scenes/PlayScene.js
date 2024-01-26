/**
 * PlayScene - the scene the player plays on
 */
class PlayScene extends PlayableScene {
    constructor(game) {
        super(game)
        let self = this;
        this._levels = [
            new Level1(), new Level2(), new Level3(),
            new Level4(), new Level5(), new Level6(),
            new Level7()
        ];
        this._currentLevel = 5;

        this._toolbar = new Toolbar(this._toolbarPosition, this._game.player);
        this._gridManager.addGrid(this._toolbar);

        this._nextBtn = new Button(
            {x: this._toolbarPosition.x + Slot.Size * 10, y: this._toolbarPosition.y},
            100, 40,
            "Next",
            () => {
                self._nextBtn.disable();
                // switch the level
                self._currentLevel = self._currentLevel + 1;

                if(self._currentLevel === self._levels.length) 
                    self._game.goToScene("Win");
                else {
                    self.initCurrentLevel();
                    self.render();
                }        
            }
        )

        this._nextBtn.disable();        
    }


    

    /**
     * render()
     * @description renders this scene
     */
    render() {
        super.render();
        this._nextBtn.render(this._game.context);
    }

    /**
     * @description triggered when a game object is updated in this scene
     */
    update(elapsed) {

        if(this._gameObjectPlaced || elapsed > this._requiredElapsed) {

            this._emitters = this._grid.projectAllLasers(this._game.context);
            this._gameObjectPlaced = false;

            if(this._currentLevel < this._levels.length && this.allTargetsActive()) {
                this._nextBtn.enable();
            }

            if(elapsed > this._requiredElapsed)
                this._start = 0;
        }
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

        this._nextBtn.onClick(point);

        if(this._currentLevel < this._levels.length && this.allTargetsActive()) {
            this._nextBtn.enable();
        }


    }

}