/**
 * PlayScene - the scene the player plays on
 */
class CreativeScene extends PlayableScene {
    constructor(game) {
        super(game)
        this._levels = [
            new CreativeLevel()
        ]
        this._toolbar = new InfiniteToolbar(this._toolbarPosition, this._game.player, this._manager)
        this._gridManager.addGrid(this._toolbar);
    }

}