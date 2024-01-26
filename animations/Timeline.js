/**
 * Timeline - a animation timeline
 */
class Timeline {
    constructor(keyFrameDelay) {
        this._keyFrameDelay = keyFrameDelay;
        this._tweens = {};
        this._activeTweens = {};
        this._keyFrames = [];
        this._shapes = {};
    }


    addKeyFrame(keyFrame) {
        this._keyFrames.push(new KeyFrame());
    }

    addShape(shape, name) {
        this._shapes[name] = shape;
    }


    play(context) {
        // starting at frame one go through each of the keyframes
        // when a keyframe with tween is hit, start that tween 
        // with the shapes
        let interval = setInterval(() => {
            if(tick < this._keyFrames.length) {
                tick++;
    
                // start the tweens that are starting
                for (const tween of this._tweens[tick]) {
                    tween.start();
                    this._activeTweens[tween.endFrame] = tween;
                }
    
                // end the tweens that are ending
                for (const tween of this._activeTweens[tick]) {
                    tween.end();
                    this._activeTweens[tween.endFrame] = null;
                }
                
            } else {
                clearInterval(interval);
            }
        }, this._keyFrameDelay);

        
    }
}