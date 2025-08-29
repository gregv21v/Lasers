class Level8 extends Level {

    /**
     * init
     * @description initializes the level
     */
    init(grid, toolbar) {
        super.init(grid, toolbar);

        this._targets.push(new Target({ "x": 8, "y": 5 }));
        let emitter1 = new Emitter({ "x": 1, "y": 5 });
        let mirror1 = new Mirror({ "x": 6, "y": 5 });
        let stickyPiston1 = new StickyPiston({ "x": 4, "y": 5 });
        let emitter2 = new Emitter({ "x": 5, "y": 3 });
        let block1 = new Block({ "x": 0, "y": 9 });

        emitter1.rotate(0);
        mirror1.rotate(180);
        stickyPiston1.rotate(0);
        emitter2.rotate(90);
        block1.rotate(0);

        let target0Slot = this._grid.getSlotAt(8, 5);
        target0Slot.isFixed = true;
        target0Slot.addItem(this._targets[0]);

        let emitter1Slot = this._grid.getSlotAt(1, 5);
        emitter1Slot.isFixed = true;
        emitter1Slot.addItem(emitter1);

        let mirror1Slot = this._grid.getSlotAt(6, 5);
        mirror1Slot.isFixed = true;
        mirror1Slot.addItem(mirror1);

        let stickyPiston1Slot = this._grid.getSlotAt(4, 5);
        stickyPiston1Slot.isFixed = true;
        stickyPiston1Slot.addItem(stickyPiston1);

        let emitter2Slot = this._grid.getSlotAt(5, 3);
        emitter2Slot.isFixed = true;
        emitter2Slot.addItem(emitter2);

        this._toolbar.add(block1);
    }

}