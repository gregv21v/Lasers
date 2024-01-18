class Player {
    constructor() {
        this._hand = null;
    }


    get hand() {
        return this._hand;
    }

    set hand(value) {
        this._hand = value;
    }
}