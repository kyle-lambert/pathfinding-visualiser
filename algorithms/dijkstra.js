export const dijkstra = function (allNodes, startNode, endNode) {
  const unvisitedNodes = flattenAllNodes(allNodes);

  const visitedNodesInOrder = [];
  startNode.dist = 0;

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode === endNode) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, allNodes);
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode);
  }
  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(closestNode, allNodes) {
  const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, allNodes);
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.dist = closestNode.dist + 1
    neighbor.previousNode = closestNode;
  })
}

function getUnvisitedNeighbors(closestNode, allNodes) {
  const neighbors = [];
  const {
    row,
    col
  } = closestNode;

  if (row > 0) neighbors.push(allNodes[row - 1][col]);
  if (row < allNodes.length - 1) neighbors.push(allNodes[row + 1][col])
  if (col > 0) neighbors.push(allNodes[row][col - 1]);
  if (col < allNodes[0].length - 1) neighbors.push(allNodes[row][col + 1])

  return neighbors.filter(n => !n.isVisited);
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((a, b) => a.dist - b.dist);
}

const flattenAllNodes = function (allNodes) {
  return allNodes.reduce((acc, cur) => acc.concat(cur));
}

export function getNodesInShortestPath(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;

  while (currentNode) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}