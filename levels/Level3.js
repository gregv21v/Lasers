class Level3 extends Level {

    /**
     * init
     * @description initializes the level
     */ 
    init(grid, toolbar) {
        super.init(grid, toolbar);

        var mirror1 = new Mirror({x: 0, y: 0});
        var mirror2 = new Mirror({x: 0, y: 0});
        var mirror3 = new Mirror({x: 0, y: 0});
        var mirror4 = new Mirror({x: 0, y: 0});
        var beam = new Emitter({x: 0, y: 0});
        this._targets.push(new Target({x: 0, y: 0}));

        mirror1.rotate(90);
        mirror3.rotate(180);
        mirror4.rotate(270);    

        var emitterSlot = this._grid.getSlotAt(3, 3);
        emitterSlot.isFixed = true;
        emitterSlot.addItem(beam);

        var targetSlot = this._grid.getSlotAt(2, 3);
        targetSlot.isFixed = true;
        targetSlot.addItem(this._targets[0]);

        this._toolbar.add(mirror1);
        this._toolbar.add(mirror2);
        this._toolbar.add(mirror3);
        this._toolbar.add(mirror4);
    }

}