/**
 * WinScene - the scene that shows that the player won.
 */
class WinScene extends Scene {

    constructor(game) {
        super(game);

        this._firework = new Firework(
            game, 
            {x: this._game.width / 2 + 100, y: this._game.height / 2 - 100},
            100,
            ["red", "green", "blue"], 
            20
        )
    }


    /**
     * draw()
     * @description draws the scene
     */
    render() {
        this._game.context.clearRect(0, 0, this._game.width, this._game.height);
        this._game.context.font = "30px sans-serif";
        this._game.context.fillStyle = "green";
        this._game.context.textAlign = 'center';
        this._game.context.textBaseline = 'middle';
        this._game.context.fillText(
            "You Win!!", this._game.width / 2, this._game.height / 2
        )

        //this._firework.play(this._game.context);
    }

}