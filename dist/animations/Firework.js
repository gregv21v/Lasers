
/**
 * Firework - a firework animation
 */
class Firework {

    /**
     * constructor()
     * @description constructs the firework animation
     * @param {Point} center the center of the firework
     * @param {Number} radius the radius of the firework when its completely exploded
     * @param {Array[Color]} colors the colors of the firework
     * @param {Number} lineLength the length of the lines in the firework
     * @param {Integer} lineCount the number of lines in the firework
     */
    constructor(game, center, radius, colors, lineCount) {
        this._game = game;
        this._center = center;
        this._radius = radius;
        this._colors = colors;
        this._lineCount = lineCount;

        

    }


    explosion(context, angle, deltaTime) {

            
        for (var i = 0; i < this._lineCount; i++) {
            
            context.beginPath();
            context.moveTo(
                this._center.x,
                this._center.y
            );
            context.lineTo(
                this._center.x + deltaTime * Math.cos(angle * i),
                this._center.y + deltaTime * Math.sin(angle * i)
            );


            if(i % 2 === 0) {
                context.strokeStyle = "red";
            } else {
                context.strokeStyle = "green";
            }
            context.stroke();
        }
    }


    /**
     * @description the animation for showing the firework disapate
     */
    disapation(context, angle, deltaTime) {
        
        for (var i = 0; i < this._lineCount; i++) {
            
            context.beginPath();
            context.moveTo(
                this._center.x + (deltaTime) * Math.cos(angle * i),
                this._center.y + (deltaTime) * Math.sin(angle * i)
            );
            context.lineTo(
                this._center.x + this._radius * Math.cos(angle * i),
                this._center.y + this._radius * Math.sin(angle * i)
            );


            if(i % 2 === 0) {
                context.strokeStyle = "red";
            } else {
                context.strokeStyle = "green";
            }
            context.stroke();
        }
    }


    animate(context) {
        deltaTime += 1;
        context.clearRect(0, 0, self._game.width, self._game.height);


        
        if(deltaTime >= self._radius) {
            if(exploding) {
                exploding = false;
                deltaTime = 0;
            } else 
                clearInterval(animation);
        }
    }
    

    play(context) {
        let deltaTime = 0;
        let self = this;
        let angle = Math.PI * 2 / this._lineCount;
        let exploding = true;

        
        this._stage = new createjs.Stage("stage")
        this._line = new createjs.Shape();

        this._line.graphics
            .setStrokeStyle(1)
            .beginStroke("#0000FF")

        let moveToCmd = this._line.graphics.moveTo(
            this._center.x,
            this._center.y
        ).command;

        let lineToCmd = this._line.graphics.lineTo(
            this._center.x + 20 * Math.cos(0),
            this._center.y + 20 * Math.sin(0)
        ).command;

        this._line.graphics.endStroke();

        
  
        //this._stage.update();
        this._stage.addChild(this._line);


        createjs.Tween.get(this._line.graphics.command, {loop: true})
                .to(
                    {
                        x: this._center.x + 20 * Math.cos(angle), 
                        y: this._center.y + 20 * Math.sin(angle)
                    }, 
                    1000, createjs.Ease.getPowInOut(4)
                )

        createjs.Ticker.framerate = 10;
        let i = 0;
        createjs.Ticker.addEventListener("tick", () => {
            i++;

        });
                

        // there are two stages to the animation
        // stage one: 
        //  You animate the drawing of lines from the center of the firework to the radius of the firework
        

        // stage two:
        // You animate the ereasing of that same line starting from the center

        // win animation
        
    }
}