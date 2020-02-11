import Node from './Node.js'

export default class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.algoRunning = false;
    this.animationSpeed = 10; // ms
  }

  resetNodeProps() {
    this.grid.reduce((acc, cur) => acc.concat(cur)).forEach(node => {
      node.isVisited = false;
      node.distance = Infinity;
      node.previousNode = null;
    })
  }

  setInititalGrid() {
    const grid = new Array(this.rows);
    for (let r = 0; r < this.rows; r++) {
      grid[r] = new Array(this.cols)
      for (let c = 0; c < this.cols; c++) {
        grid[r][c] = new Node(r, c);

        // default start node
        if (r === Math.floor((this.rows - 1) / 2) && c === Math.floor(2)) {
          grid[r][c].isStart = true;
          this.startNode = grid[r][c];
        }

        // default target node
        if (r === Math.floor((this.rows - 1) / 2) && c === Math.floor(this.cols - 3)) {
          grid[r][c].isTarget = true;
          this.targetNode = grid[r][c];
        }
      }
    }
    this.grid = grid;
  }

  setAlgoRunning(bool) {
    this.algoRunning = bool;
  }

  addWall(row, col) {
    const node = this.grid[row][col];
    node.isWall = true;

    return node
  }
}