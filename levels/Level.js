class Level {
    /**
     * @description constructs the level
     * @param {Number} number the level number
     */
    constructor() {
        this._targets = [];
    }

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        this._grid = grid;
        this._toolbar = toolbar;

        this._grid.clear();
        this._toolbar.clear();
    }

    render(context) {
        this._grid.render(context);
        this._toolbar.render(context);

        this._grid.projectLaser(context);
    }


    get targets() {
        return this._targets;
    }
}