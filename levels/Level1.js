class Level1 extends Level {

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        super.init(grid, toolbar);

        var mirror = new Mirror({x: 0, y: 0});
        var beam = new Emitter({x: 0, y: 0});
        var beamSplitter = new BeamSplitter({x: 0, y: 0});
        this._targets.push(new Target({x: 0, y: 0}));

        var emitterSlot = this._grid.getSlotAt(3, 3);
        emitterSlot.isFixed = true;
        emitterSlot.addItem(beam);

        var targetSlot = this._grid.getSlotAt(6, 4);
        targetSlot.isFixed = true;
        targetSlot.addItem(this._targets[0]);

        this._toolbar.add(mirror);
        this._toolbar.add(beamSplitter);
    }
}