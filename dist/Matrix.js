class Matrix {
    constructor(rows, columns) {
        this._rows = rows;
        this._columns = columns;
        this._cells = this._createCells();
    }


    render(context, startX, startY) {
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = "12px Arial";
        context.fillStyle = "black";
        for (var x = 0; x < this._columns; x++) {
            for (var y = 0; y < this._rows; y++) {
                context.fillText(this._cells[x][y], startX + x * 20, startY + y * 20);
            }
        }
    }

    _createCells() {
        let matrix = [];
        for (var x = 0; x < this._columns; x++) {
            matrix.push([]);
            for (var y = 0; y < this._rows; y++) {
                matrix[x].push(0)
            }
        }

        return matrix;
    }


    xorWith(other) {
        let output = new Matrix(this._rows, this._columns);
        for (var x = 0; x < this._columns; x++) {
            for (var y = 0; y < this._rows; y++) {
                output.setAt(x, y, this.getAt(x, y) ^ other.getAt(x, y));
            }
        }
        return output;
    }

    reset() {
        for (var x = 0; x < this._columns; x++) {
            for (var y = 0; y < this._rows; y++) {
                this._cells[x][y] = 0;
            }
        }
    }

    setAt(x, y, value) {
        this._cells[x][y] = value;
    }


    getAt(x, y) {
        return this._cells[x][y];
    }
}