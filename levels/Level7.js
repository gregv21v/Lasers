class Level7 extends Level {

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        super.init(grid, toolbar);

        var mirror = new Mirror({x: 0, y: 0});
        var mirror1 = new Mirror({x: 0, y: 0});
        var mirror2 = new Mirror({x: 0, y: 0});
        var beam = new Emitter({x: 0, y: 0});
        var beamSplitter = new BeamSplitter({x: 0, y: 0});
        this._targets.push(new Target({x: 0, y: 0}));
        this._targets.push(new Target({x: 0, y: 0}));

        mirror1.rotate(90);

        beamSplitter.rotate(0);

        var emitterSlot = this._grid.getSlotAt(3, 3);
        emitterSlot.isFixed = true;
        emitterSlot.addItem(beam);

        //var blockSlot = this._grid.getSlotAt(5, 3);
        //blockSlot.isFixed = true;
        //blockSlot.addItem(block);

        var targetSlot = this._grid.getSlotAt(7, 2);
        targetSlot.isFixed = true;
        targetSlot.addItem(this._targets[0]);

        var targetSlot = this._grid.getSlotAt(7, 4);
        targetSlot.isFixed = true;
        targetSlot.addItem(this._targets[1]);

        this._toolbar.add(mirror1);
        this._toolbar.add(mirror2);
        this._toolbar.add(beamSplitter);
    }

}