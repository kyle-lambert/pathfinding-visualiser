const Node = function (row, col) {
  this.row = row;
  this.col = col;
  this.id = `${row}-${col}`;
  this.isStart = (row === 9 && col === 15) ? true : false;
  this.isEnd = (row === 0 && col === 0) ? true : false;
  this.dist = Infinity;
  this.isVisited = false;
}

export default class Board {
  constructor() {
    this.startNode = null;
    this.endNode = null;
    this.rows = 15;
    this.cols = 30;
  }

  init() {
    this.initialiseBoard();
    this.findStartNode();
    this.findEndNode();
  }

  initialiseBoard() {
    const output = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      output[i] = new Array(this.cols)
      for (let j = 0; j < this.cols; j++) {
        output[i][j] = new Node(i, j);
      }
    }
    this.allNodes = output;
  }

  setClassListByID(id, classname) {
    document.getElementById(id).classList.add(classname);
  }

  findStartNode() {
    this.startNode = this.allNodes.reduce((acc, cur) => acc.concat(cur)).find(n => n.isStart);
  }

  findEndNode() {
    this.endNode = this.allNodes.reduce((acc, cur) => acc.concat(cur)).find(n => n.isEnd);
  }
}