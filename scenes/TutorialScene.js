/**
 * TutorialScene - the scene that walks the player through the game
 */
class TutorialScene extends PlayableScene {
    constructor(game) {
        super(game)
        var self = this;

        this._levels = [
            new Level1(), new Level2(), new Level3(),
            new Level4(), new Level5(), new Level6(),
            new Level7()
        ];


        this._nextBtn = new Button(
            {x: this._toolbarPosition.x + Slot.Size * 10, y: this._toolbarPosition.y},
            100, 40,
            "Next",
            () => {
                self._nextBtn.disable();
                // switch the level
                self._currentLevel = self._currentLevel + 1;
                self.initCurrentLevel();
                self.render();

                if(self._currentLevel === self._levels.length - 1) 
                    self._nextBtn.text = ""
            }
        )


        this._helpBtn = new Button(
            {x: this._toolbarPosition.x + Slot.Size * 10, y: this._toolbarPosition.y - 40},
            100, 40,
            "Help",
            () => {
                self._game.goToScene("Help")
            }
        )

        this._nextBtn.disable();
    }


    init() {
        this.initCurrentLevel();
    }

    
    

    
    allTargetsActive() {
        let targets = this._levels[this._currentLevel].targets;

        if(targets.length === 0) return false;

        for (const target of targets) {
            console.log(target.isActivated());
            console.log(target);
            if(!target.isActivated()) {
                return false;
            }
        }
        return true;
    }

    initCurrentLevel() {
        this._levels[this._currentLevel].init(this._grid, this._toolbar);
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

        this._levels[this._currentLevel].render(this._game.context);

        this._grid.render(this._game.context);
        this._toolbar.render(this._game.context);

        this._nextBtn.render(this._game.context);
        this._helpBtn.render(this._game.context);

        this._levels[this._currentLevel].targets.forEach((target) => {
            target.deactivate();
        });
        this._grid.projectLaser(this._game.context);
    }


    /**
     * onKeyDown()
     * @description triggered when a key is pressed down
     */
    onKeyDown(event) {
        if(event.keyCode === 82) {
            this._game.player.hand.rotate(90);
            this.render();
            this._game.player.hand.render(this._game.context);
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
        };

        // find the clicked game object
        this._gridManager.onMouseDown(event);

        this._levels[this._currentLevel].targets.forEach((target) => {
            target.deactivate();
        });
        this._grid.projectLaser(this._game.context);

        this._nextBtn.onClick(point);
        this._helpBtn.onClick(point);

        if(this.allTargetsActive()) {
            this._nextBtn.enable();
            if(this._currentLevel === this._levels.length - 1) 
                this._nextBtn.text = "You Win!!";

        }
    }

}