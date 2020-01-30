export default class Dijkstra {
  constructor() {
    this.unvisitedNodes = null;
    this.visitedNodeInOrder = [];
    this.closestNode = null;
  }

  runDijkstra(nodes, start, target) {
    this.unvisitedNodes = this._flattenArray(nodes);
    start.distance = 0;
    this._sortNodesByDistance();

    while (this.unvisitedNodes.length > 0) {
      this._sortNodesByDistance();
      this.closestNode = this.unvisitedNodes.shift();
      if (this.closestNode === target) return this.visitedNodeInOrder;
      // if (this.closestNode === wall) {
      //   // code to handle grid walls
      // }
      this._updateUnvisitedNeighbors(nodes);
      this.closestNode.isVisited = true
      this.visitedNodeInOrder.push(this.closestNode);
    }
  }

  _updateUnvisitedNeighbors(nodes) {
    const unvisitedNeighbors = this._getUnvisitedNeighbors(nodes);
    unvisitedNeighbors.forEach(neighbor => {
      neighbor.distance = this.closestNode.distance + 1
      neighbor.previousNode = this.closestNode;
    })
  }

  _getUnvisitedNeighbors(nodes) {
    const neighbors = [];
    const {
      row,
      col
    } = this.closestNode;

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

// export const dijkstra = function (nodes, start, target) {
//   const unvisitedNodes = nodes.reduce((total, node) => total.concat(node));

//   const visitedNodesInOrder = [];
//   start.distance = 0;

//   while (unvisitedNodes.length > 0) {
//     sortNodesByDistance(unvisitedNodes);
//     const closestNode = unvisitedNodes.shift();
//     if (closestNode === target) return visitedNodesInOrder
//     updateUnvisitedNeighbors(closestNode, nodes);
//     closestNode.isVisited = true
//     visitedNodesInOrder.push(closestNode);
//   }
//   return visitedNodesInOrder;
// }

// function updateUnvisitedNeighbors(closestNode, nodes) {
//   const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, nodes);
//   unvisitedNeighbors.forEach(neighbor => {
//     neighbor.distance = closestNode.distance + 1
//     neighbor.previousNode = closestNode;
//   })
// }

// function getUnvisitedNeighbors(closest, nodes) {
//   const neighbors = [];
//   const {
//     row,
//     col
//   } = closest;

//   if (row > 0) neighbors.push(nodes[row - 1][col]);
//   if (row < nodes.length - 1) neighbors.push(nodes[row + 1][col])
//   if (col > 0) neighbors.push(nodes[row][col - 1]);
//   if (col < nodes[0].length - 1) neighbors.push(nodes[row][col + 1])

//   return neighbors.filter(n => !n.isVisited);
// }

// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort((a, b) => a.distance - b.distance);
// }

// export function getShortestPath(target) {
//   const nodesInShortestPathOrder = [];
//   let currentNode = target;

//   while (currentNode) {
//     nodesInShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousNode;
//   }
//   return nodesInShortestPathOrder;
// }