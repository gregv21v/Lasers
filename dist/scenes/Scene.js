class Scene {


    /**
     * constructor()
     * @description constructs the scene
     */
    constructor(game) {
        this._context = game.context;
        this._game = game;
    }


    init() {
        
    }


    destroy() {
        
    }


    /**
     * render()
     * @description renders the scene
     */
    render() {}



    /**
     * update()
     * @description updates the scene
     */
    update() {}


    /**
    * onMouseUp()
    * @description called when the mouse button has been released
    * @param {MouseEvent} event the mouse event
    */
    onMouseUp(event) {}

    /**
     * onMouseDown()
     * @description called when the mouse button has been pressed
     * @param {MouseEvent} event the mouse event
     */
    onMouseDown(event) {}


    /**
     * onMouseMove()
     * @description called when the mouse button has moved
     * @param {MouseEvent} event the mouse event
     */
    onMouseMove(event) {}


    /**
     * onMouseClick() 
     * @description called when the mouse is clicked
     * @param {MouseEvent} event the mouse event
     */
    onMouseClick(event) {}

    /**
     * onKeyUp()
     * @description called when a key has been released
     * @param {KeyboardEvent} event the keyboard event
     */
    onKeyUp(event) {}

    /**
     * onKeyDown()
     * @description called when a key has been pressed
     * @param {KeyboardEvent} event the keyboard event
     */
    onKeyDown(event) {}
}