import Node from './Node.js'

export default class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.algoRunning = false;
    this.animationSpeed = 10; // ms
  }

  setInititalGrid() {
    const grid = new Array(this.rows);
    for (let r = 0; r < this.rows; r++) {
      grid[r] = new Array(this.cols)
      for (let c = 0; c < this.cols; c++) {
        grid[r][c] = new Node(r, c);
      }
    }
    this.grid = grid;
  }

  setInitialStartNode() {
    const row = Math.floor((this.rows - 1) / 2);
    const col = Math.floor(2);
    const start = this.grid[row][col];
    start.isStart = true;
    this.startNode = start;
  }

  setInitialTargetNode() {
    const row = Math.floor((this.rows - 1) / 2);
    const col = Math.floor(this.cols - 3);
    const target = this.grid[row][col];
    target.isTarget = true;
    this.targetNode = target;
  }

  setAlgoRunning(bool) {
    this.algoRunning = bool;
  }

  isStartNode(row, col) {
    const node = this.grid[row][col];
    return this.startNode === node ? true : false;
  }

  isTargetNode(row, col) {
    const node = this.grid[row][col];
    return this.targetNode === node ? true : false;
  }

  isWallNode(id) {
    const node = this._findNodeByID(id);
    return node.isWall ? true : false;
  }

  addWall(row, col) {
    const node = this.grid[row][col];
    node.isWall = true;

    return node
  }

  // removeWall(row, col) {
  //   const node = this.grid[row][col];
  //   node.isWall = !node.isWall;

  //   // const index = this.walls.findIndex(cur => cur.row === row && cur.col === col);
  //   // this.walls.splice(index, 1);
  //   return node
  // }
}