class WelcomeScene extends Scene {

    constructor(game) {
        super(game);

        let self = this;




        this._startBtn = new Button(
            {x: game.width / 2 - 50, y: game.height / 2},
            100, 50, "Start", 
            () => {
                self._game.goToScene("Play");
            }
        )

        this._helpBtn = new Button(
            {x: game.width / 2 - 50, y: game.height / 2 + 60},
            100, 40,
            "Tutorial",
            () => {
                self._game.goToScene("Tutorial")
            }
        )


        this._instructions = new MultiLineText(
            {x: game.width / 2, y: game.height / 2 - 60},
            [
                "A game about maneuvering a laser around obstacles to get to a target.",
                "The first levels are introductory levels used to show you how the game works."
            ]
        )
    }


    /**
     * draw()
     * @description draws the scene
     * @param {CanvasRenderingContext2D} context the context to draw to
     */
    render() {
        this._game.context.font = "30px sans-serif";
        this._game.context.textAlign = 'center';
        this._game.context.textBaseline = 'middle';
        this._game.context.fillText(
            "Lasers", this._game.width / 2, this._game.height / 2 - 120
        )


        this._game.context.font = "15px sans-serif";
        this._game.context.textAlign = 'center';
        this._instructions.render(this._game.context);


        this._startBtn.render(this._game.context);
        this._helpBtn.render(this._game.context);
    }


    /**
     * onMouseClick() 
     * @description called when the mouse is clicked
     * @param {MouseEvent} event the mouse event
     */
    onMouseClick(event) {
        this._startBtn.onClick(event);
    }
}