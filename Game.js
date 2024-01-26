/**
 * Game - the game to be created
 */
class Game {
    /**
     * constructor()
     * @description constructs the game 
     */
    constructor() {
        this._canvas = document.querySelector("canvas");
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._context = this._canvas.getContext("2d");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._player = new Player();


        this._scenes = {
            Welcome: new WelcomeScene(this),
            Tutorial: new TutorialScene(this),
            Play: new PlayScene(this),
            Creative: new CreativeScene(this),
            Win: new WinScene(this)
        }
        this.goToScene("Welcome");

        let self = this;
        window.addEventListener('keydown', (event) => {
            self.currentScene.onKeyDown(event)
        });

        window.addEventListener('keyup', (event) => {
            self.currentScene.onKeyUp(event)
        });

        this._canvas.addEventListener('mousedown', (event) => {
            self.currentScene.onMouseDown(event)
        });

        this._canvas.addEventListener('mousemove', (event) => {
            self.currentScene.onMouseMove(event)
        });

        this._canvas.addEventListener('mouseup', (event) => {
            self.currentScene.onMouseUp(event)
        });
  
        this._canvas.addEventListener('click', (event) => {
            self.currentScene.onMouseClick(event)
        });
    }


    /** 
     * setupCurrentScene() 
     * @description sets the current scene up
     */
    setupCurrentScene() {
        console.log("Setup Scene: ", this._currentSceneName);
        this.currentScene.init();
        this.currentScene.render();
    }


    /**
     * goToScene()
     * @description goes to a particular scene
     * @param {String} name the name of the scene
     */
    goToScene(name) { 
        if(this._currentSceneName !== name) {
            if(this.currentScene)
                this.currentScene.destroy();
            this._currentSceneName = name;
            this.setupCurrentScene();
        }
    }

    /**
     * getScene()
     * @description gets a particular scene by name
     * @param {String} name the name of the scene to get
     * @returns the scene with the given name
     */
    getScene(name) {
        return this._scenes[name];
    }

    /**
     * get player()
     * @description gets a the player playing the game
     * @returns {Player} the player
     */
    get player() {
        return this._player;
    }


    /**
     * get canvas()
     * @description gets the canvas
     * @returns {Canvas} the canvas
     */
    get canvas() {
        return this._canvas;
    }

    /**
     * get context()
     * @description gets the 2d context of the game
     * @returns {CanvasRenderingContext2D} the 2d context of the game
     */
    get context() {
        return this._context;
    }


    /**
     * getCurrentScene()
     * @description gets the current scene
     */
    get currentScene() {
        return this._scenes[this._currentSceneName];
    }


    /**
     * get width()
     * @description gets the width of the game 
     * @returns {Number} the width of the game
     */
    get width() {
        return this._width;
    }

    /**
     * get height()
     * @description gets the height of the game
     * @returns {Number} the height of game
     */
    get height() {
        return this._height;
    }
}