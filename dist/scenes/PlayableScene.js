/**
 * PlayableScene - a scene you can play the game on 
 */

/**
 * PlayScene - the scene the player plays on
 */
class PlayableScene extends Scene {
    constructor(game) {
        super(game)
        this._levels = [];
        this._currentLevel = 0;
        this._rows = 10;
        this._columns = 20;

        this._gridPosition = {
            x: game.width / 2 - (this._columns * Slot.Size) / 2,
            y: game.height / 2 - (this._rows * Slot.Size) / 2 - Slot.Size
        }
        this._toolbarPosition  = {
            x: game.width / 2 - (10 * Slot.Size) / 2,
            y: game.height / 2 + (10 * Slot.Size) / 2
        }

        this._grid = new Grid(this._gridPosition, this._game.player, this._manager, this._rows, this._columns);
        
        this._gridManager = new GridManager(this._game);
        this._gridManager.addGrid(this._grid);
        

        this._emitters = [];
        this._gameObjectPlaced = false;

        this._start = undefined;
        this._requiredElapsed = 10000 / 10; // desired interval is 100fps
    }


    


    init() {
        this.initCurrentLevel();  
        this.start(); 
    }


    destroy() {
        this.stop();
    }


    start() {
        let self = this;
        this._ticker = (now) => {
           
            self.render();
            
            self._frameId = window.requestAnimationFrame(this._ticker)

            if(this._start === undefined) {
                this._start = now;
            }
            const elapsed = now - this._start;

            self.update(elapsed);
        }
        this._ticker();
    }


    stop() {
        window.cancelAnimationFrame(this._frameId);
    }

    allTargetsActive() {
        let targets = this._levels[this._currentLevel].targets;

        if(targets.length === 0) return false;

        for (const target of targets) {
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

        this._grid.render(this._game.context);
        this._toolbar.render(this._game.context);

        if(this._game.player.hand) {
            this._game.player.hand.render(this._game.context);
        }

        for (const emitter of this._emitters) {
            this._grid.renderLaserNode(this._game.context, emitter);
        }
        
    }

    /**
     * @description triggered when a game object is updated in this scene
     */
    update(elapsed) {

        if(this._gameObjectPlaced || elapsed > this._requiredElapsed) {

            this._emitters = this._grid.projectAllLasers(this._game.context);
            this._gameObjectPlaced = false;

            if(elapsed > this._requiredElapsed)
                this._start = 0;
        }
    }


    /**
     * onKeyDown()
     * @description triggered when a key is pressed down
     */
    onKeyDown(event) {
        if(event.keyCode === 82) {
            this._game.player.hand.rotate(90);
        }
    }


    /**
     * onMouseDown()
     * @description called when the mouse button has been pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {
        this._gridManager.onMouseDown(event);
        this._gameObjectPlaced = true;
    }

    /**
     * onMouseMove()
     * @description called when the mouse has moved
     * @param {MouseEvent} event the mouse event
     */
    onMouseMove(event) {
        this._gridManager.onMouseMove(event);
    }
}