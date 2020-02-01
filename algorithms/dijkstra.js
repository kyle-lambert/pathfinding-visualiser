export default class Dijkstra {
  constructor() {
    this.unvisitedNodes = null;
    this.visitedNodeInOrder = [];
  }

  runDijkstra(nodes, start, target) {
    this.unvisitedNodes = this._flattenArray(nodes);
    start.distance = 0;
    let closestNode = start

    while (this.unvisitedNodes.length > 0) {
      this._sortNodesByDistance();
      closestNode = this.unvisitedNodes.shift();
      if (closestNode === target) return this.visitedNodeInOrder;
      // if (this.closestNode === wall) {
      //   // code to handle grid walls
      // }
      this._updateUnvisitedNeighbors(closestNode, nodes);
      closestNode.isVisited = true
      this.visitedNodeInOrder.push(closestNode);
    }
  }

  getShortestPath(target) {
    const nodesInShortestPathOrder = [];
    let currentNode = target;

    while (currentNode) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  // private
  _updateUnvisitedNeighbors(closest, nodes) {
    const unvisitedNeighbors = this._getUnvisitedNeighbors(closest, nodes);
    unvisitedNeighbors.forEach(neighbor => {
      neighbor.distance = closest.distance + 1
      neighbor.previousNode = closest;
    })
  }

  _getUnvisitedNeighbors(closest, nodes) {
    const neighbors = [];
    const {
      row,
      col
    } = closest;

    if (row > 0) neighbors.push(nodes[row - 1][col]);
    if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col])
    if (col > 0) neighbors.push(nodes[row][col - 1]);
    if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1])

    return neighbors.filter(n => !n.isVisited);
  }

  _sortNodesByDistance() {
    this.unvisitedNodes.sort((a, b) => a.distance - b.distance);
  }

  _flattenArray(nodes) {
    return nodes.reduce((total, node) => total.concat(node));
  }
}