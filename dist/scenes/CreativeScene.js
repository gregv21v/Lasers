/**
 * PlayScene - the scene the player plays on
 */
class CreativeScene extends Scene {
    constructor(game) {
        super(game)
        var self = this;
        this._manager = {}
        this._levels = [
            new CreativeLevel()
        ];
        this._currentLevel = 0;

        var gridPosition = {
            x: game.width / 2 - (10 * Slot.Size) / 2,
            y: game.height / 2 - (10 * Slot.Size) / 2 - Slot.Size
        }
        var toolbarPosition  = {
            x: game.width / 2 - (10 * Slot.Size) / 2,
            y: game.height / 2 + (10 * Slot.Size) / 2
        }


        this._grid = new Grid(gridPosition, this._game.player, this._manager, 10, 10);
        this._toolbar = new InfiniteToolbar(toolbarPosition, this._game.player, this._manager);

        this._gridManager = new GridManager(this._game);
        this._gridManager.addGrid(this._grid);
        this._gridManager.addGrid(this._toolbar);
        
    }


    init() {
        this.initCurrentLevel();
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
    }

    /**
     * @description triggered when a game object is updated in this scene
     */
    update() {
        this._grid.reset();
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
        this.render();
        this.update();

        // find the clicked game object
        this._gridManager.onMouseDown(event);
    }

    /**
     * onMouseMove()
     * @description called when the mouse has moved
     * @param {MouseEvent} event the mouse event
     */
    onMouseMove(event) {
        this.render();
        this.update();
        this._gridManager.onMouseMove(event);
    }
}