class Game {
    constructor(context, canvas) {
        this._context = context;
        this._canvas = canvas;
        var self = this;
        this._player = new Player();
        this._manager = {}

        this._levels = [
            new Level1(), new Level2(), new Level3(),
            new Level4(), new Level5(), new Level6(),
            new Level7()
        ];
        this._currentLevel = 0;

        var gridPosition = {
            x: canvas.width / 2 - (10 * Slot.Size) / 2,
            y: canvas.height / 2 - (10 * Slot.Size) / 2 - Slot.Size
        }
        var toolbarPosition = {
            x: canvas.width / 2 - (10 * Slot.Size) / 2,
            y: canvas.height / 2 + (10 * Slot.Size) / 2
        }


        this._grid = new Grid(gridPosition, this._player, this._manager, 10, 10);
        this._toolbar = new Toolbar(toolbarPosition, this._player, this._manager);
        this._nextBtn = new Button(
            {x: toolbarPosition.x + Slot.Size * 10, y: toolbarPosition.y},
            100, 40,
            "Next",
            () => {
                self._nextBtn.disable();
                // switch the level
                self._currentLevel = self._currentLevel + 1;
                self.initCurrentLevel();
                self.render();

                if(self._currentLevel === self._levels.length - 1) 
                    self._nextBtn.text = ""
            }
        )

        this._nextBtn.disable();

        canvas.addEventListener("mousedown", (event) => {
            self.onMouseDown(event);
        })

        canvas.addEventListener("mousemove", (event) => {
            self.onMouseMove(event);
        });
    }

    
    getMousePosition(event) {
        return {
            x: event.clientX,
            y: event.clientY
        }
    }

    
    allTargetsActive() {
        let targets = this._levels[this._currentLevel].targets;

        if(targets.length === 0) return false;

        for (const target of targets) {
            console.log(target.isActivated());
            console.log(target);
            if(!target.isActivated()) {
                return false;
            }
        }
        return true;
    }

    initCurrentLevel() {
        this._levels[this._currentLevel].init(this._grid, this._toolbar);
    }

    render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        context.font = "15px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.textBaseline = "top";
        this._context.fillText("Level: " + (this._currentLevel + 1), 25, 25)

        this._levels[this._currentLevel].render(this._context);

        this._grid.render(this._context);
        this._toolbar.render(this._context);

        this._nextBtn.render(this._context);

        this._levels[this._currentLevel].targets.forEach((target) => {
            target.deactivate();
        });
        this._grid.projectLaser(this._context);
    }


    onMouseDown(event) {
        // find the clicked game object
        let point = this.getMousePosition(event);
        let slot = this._toolbar.findSlotContainingPoint(point);
        slot = (slot) ? slot : this._grid.findSlotContainingPoint(point); 

        console.log(slot);
        if(slot)
            if(!this._player.hand && !slot.isFixed) {    
                this._player.hand = slot.item;
                slot.removeItem();
            } else if(slot.isEmpty()) {
                slot.addItem(this._player.hand);
                this._player.hand = null;
            }

        this._levels[this._currentLevel].targets.forEach((target) => {
            target.deactivate();
        });
        this._grid.projectLaser(this._context);

        this._nextBtn.onClick(point);

        if(this.allTargetsActive()) {
            this._nextBtn.enable();
            if(this._currentLevel === this._levels.length - 1) 
                this._nextBtn.text = "You Win!!";

        }
    }


    onMouseMove(event) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this.render(this._context);

        if(this._player.hand) {
            this._player.hand.position = {
                x: event.clientX - GameObject.Size / 2,
                y: event.clientY - GameObject.Size / 2
            };
            this._player.hand.render(this._context);
        }


        this._context.beginPath();
        this._context.ellipse(
            event.clientX, 
            event.clientY,
            2, 2, 0,
            0, Math.PI * 2
        )
        this._context.closePath();
        this._context.fillStyle = "red";
        this._context.fill();
    }
}