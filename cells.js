class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        // cell has walls : top right bottom left
        this.walls = [true, true, true, true];

    }

    highlight() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(255, 255, 0)
        rect(x, y, w, w)
    }

    show = function () {
        let x = this.i * w;
        let y = this.j * w;
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke()
            fill(120, 0, 255)
            rect(x, y, w, w)
        }
        // noFill();
        // rect(x, y, w, w)
    }

    checkNeighbors() {
        let neighbors = [];

        let top = grid[getIndex(this.i, this.j - 1)];
        let right = grid[getIndex(this.i + 1, this.j)];
        let bottom = grid[getIndex(this.i, this.j + 1)];
        let left = grid[getIndex(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length <= 0) return undefined

        let r = floor(random(0, neighbors.length));
        return neighbors[r];
    }
}