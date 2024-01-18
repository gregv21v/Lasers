
/**
 * MainMenu - the main menu of the game
 */
class MainMenu {
    /**
     * constructor()
     * @description constructs the main menu
     * @param {Point} position the position of the main menu
     */
    constructor(position) {
        this._position = position; 
        this._menuItems = [
            "Save",
            "Load",
            "Level Creator"
        ]
    }


    /**
     * render()
     * @description renders the menu 
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {

    }
}