export default class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.id = `${row}-${col}`;
    this.distance = Infinity;
    this.isVisited = false;
  }
}