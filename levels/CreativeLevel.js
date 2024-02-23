class CreativeLevel extends Level {

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        super.init(grid, toolbar);

        this._toolbar.add(new BeamExpander());
        this._toolbar.add(new BeamSplitter());
        this._toolbar.add(new Block());
        this._toolbar.add(new Emitter());
        this._toolbar.add(new Mirror());
        this._toolbar.add(new Rotator());
        this._toolbar.add(new Target());
        this._toolbar.add(new TimerObject());
        this._toolbar.add(new Label({ x:0, y:0 }, "Input"));
        this._toolbar.add(new Label({ x:0, y:0 }, "Output"));
    }

}