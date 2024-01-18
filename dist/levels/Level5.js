class Level5 extends Level {

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        super.init(grid, toolbar);

        var beamExpander = new BeamExpander({x: 0, y: 0});
        var mirror = new Mirror({x: 0, y: 0});
        var beam = new Emitter({x: 0, y: 0});
        this._targets.push(new Target({x: 0, y: 0}));

        this._targets[0].requiredLaserSize = 2;
 
        var emitterSlot = this._grid.getSlotAt(3, 3);
        emitterSlot.isFixed = true;
        emitterSlot.addItem(beam);

        var targetSlot = this._grid.getSlotAt(7, 4);
        targetSlot.isFixed = true;
        targetSlot.addItem(this._targets[0]);

        this._toolbar.add(beamExpander);
        this._toolbar.add(mirror);
    }

}