import Node from './Node.js'

export default class Grid {
  constructor() {
    this.nodes = null;
    this.startNode = null;
    this.targetNode = null;
    this.shortestPath = null;
    this.nodesVisited = null;
    this.rows = 15;
    this.cols = 15;
    this.animationSpeed = 25;
  }

  setShortestPath(nodes) {
    this.shortestPath = nodes
  }

  setNodesVisited(nodes) {
    this.nodesVisited = nodes
  }

  initialiseGrid() {
    this._createGrid();
    this._setInitialStartNode();
    this._setInitialTargetNode();
  }

  // view
  animateVisitedNodes() {
    this.nodesVisited.forEach((node, i) => {
      const id = node.id
      setTimeout(() => {
        if (node === this.startNode || node === this.targetNode) return
        document.getElementById(id).classList.add('tile--visited');
      }, this.animationSpeed * i);
    })
  }

  animateShortestPath() {
    setTimeout(() => {
      this.shortestPath.forEach((node, i) => {
        const id = node.id;
        setTimeout(() => {
          if (node === this.startNode || node === this.targetNode) return;
          document.getElementById(id).classList.add('tile--path');
        }, this.animationSpeed * i)
      })
    }, this.nodesVisited.length * this.animationSpeed);
  }

  renderGrid() {
    const flatNodes = this._flattenArray();
    flatNodes.forEach(node => {
      const tile = document.createElement('div');
      tile.id = node.id;
      tile.classList.add('tile');
      tile.setAttribute('data-row', node.row);
      tile.setAttribute('data-col', node.col);
      if (node === this.startNode) tile.classList.add('tile--start')
      if (node === this.targetNode) tile.classList.add('tile--target')
      document.querySelector('.grid__container').appendChild(tile);
    })
  }

  // private
  _createGrid() {
    const nodes = new Array(this.rows);
    for (let r = 0; r < this.rows; r++) {
      nodes[r] = new Array(this.cols)
      for (let c = 0; c < this.cols; c++) {
        nodes[r][c] = new Node(r, c);
      }
    }
    this.nodes = nodes;
  }

  _setInitialStartNode() {
    const row = Math.floor((this.rows - 1) / 2);
    const col = Math.floor(2);
    this.startNode = this.nodes[row][col];
  }

  _setInitialTargetNode() {
    const row = Math.floor((this.rows - 1) / 2);
    const col = Math.floor(this.cols - 3);
    this.targetNode = this.nodes[row][col];
  }

  _flattenArray() {
    return this.nodes.reduce((total, node) => total.concat(node));
  }
}