class Level9 extends Level {

	/**
	 * init
	 * @description initializes the level
	 */
	init(grid, toolbar) {
		super.init(grid, toolbar);

		let emitter1 = new Emitter({ "x": 0, "y": 5 });
		let beamSplitter1 = new BeamSplitter({ "x": 5, "y": 5 });
		this._targets.push(new Target({ "x": 16, "y": 9 }));
		let emitter2 = new Emitter({ "x": 19, "y": 5 });
		let stickyPiston1 = new StickyPiston({ "x": 0, "y": 0 });
		let piston1 = new Piston({ "x": 1, "y": 0 });
		let timerObject1 = new TimerObject({ "x": 2, "y": 0 });

		beamSplitter1.canPickUp = false;

		emitter1.rotate(360);
		beamSplitter1.rotate(90);
		emitter2.rotate(180);

		let emitter1Slot = this._grid.getSlotAt(0, 5);
		emitter1Slot.isFixed = true;
		emitter1Slot.addItem(emitter1);

		let beamSplitter1Slot = this._grid.getSlotAt(5, 5);
		beamSplitter1Slot.isFixed = true;
		beamSplitter1Slot.addItem(beamSplitter1);

		let target0Slot = this._grid.getSlotAt(17, 9);
		target0Slot.isFixed = true;
		target0Slot.addItem(this._targets[0]);

		let emitter2Slot = this._grid.getSlotAt(19, 5);
		emitter2Slot.isFixed = true;
		emitter2Slot.addItem(emitter2);



		// Add items to the toolbar
		this._toolbar.add(stickyPiston1);
		this._toolbar.add(piston1);
		this._toolbar.add(timerObject1);
	}

}
