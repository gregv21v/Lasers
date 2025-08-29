class Test extends Level {

	/**
	 * init
	 * @description initializes the level
	 */
	init(grid, toolbar) {
		super.init(grid, toolbar);

		let emitter1 = new Emitter({ "x": 2, "y": 4 });
		let stickyPiston1 = new StickyPiston({ "x": 4, "y": 4 });
		let mirror1 = new Mirror({ "x": 6, "y": 4 });
		let emitter2 = new Emitter({ "x": 6, "y": 7 });
		this._targets.push(new Target({ "x": 8, "y": 4 }));
		let block1 = new Block({ "x": 0, "y": 0 });

		emitter1.rotate(0);
		stickyPiston1.rotate(0);
		mirror1.rotate(270);
		emitter2.rotate(270);
		block1.rotate(0);

		let emitter1Slot = this._grid.getSlotAt(2, 4);
		emitter1Slot.isFixed = true;
		emitter1Slot.addItem(emitter1);

		let stickyPiston1Slot = this._grid.getSlotAt(4, 4);
		stickyPiston1Slot.isFixed = true;
		stickyPiston1Slot.addItem(stickyPiston1);

		let mirror1Slot = this._grid.getSlotAt(6, 4);
		mirror1Slot.isFixed = true;
		mirror1Slot.addItem(mirror1);

		let emitter2Slot = this._grid.getSlotAt(6, 7);
		emitter2Slot.isFixed = true;
		emitter2Slot.addItem(emitter2);

		let target0Slot = this._grid.getSlotAt(8, 4);
		target0Slot.isFixed = true;
		target0Slot.addItem(this._targets[0]);

		let block1Slot = this._grid.getSlotAt(0, 0);
		block1Slot.isFixed = true;
		block1Slot.addItem(block1);



		// Add items to the toolbar
		this._toolbar.add(block1);
	}

}
