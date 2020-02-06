export const getShortestPath = target => {
  const nodesInShortestPathOrder = [];
  let currentNode = target;

  while (currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


export const visitedNodesInOrder = (grid, start, target) => {
  if (!start || !target || !grid) return;
  const unvisitedNodes = grid.reduce((acc, cur) => acc.concat(cur));
  const visitedNodes = [];

  // always start at node with the smallest distance
  start.distance = 0;

  let currentNode = start;

  while (unvisitedNodes.length > 0) {

    sortNodesByDistance(unvisitedNodes);

    currentNode = unvisitedNodes.shift();

    if (currentNode.isWall) continue;
    if (currentNode === target) return visitedNodes;
    // no possible path
    if (currentNode.distance === Infinity) return visitedNodes;

    updateUnvisitedNeighbors(grid, currentNode);
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
  }
  return visitedNodes;
}

const updateUnvisitedNeighbors = (grid, current) => {
  const neighbors = getClosestNeighbors(grid, current);
  neighbors.forEach(n => {
    n.distance = current.distance + 1;
    n.previousNode = current;
  })
}

const getClosestNeighbors = (grid, current) => {
  const {
    row,
    col
  } = current;

  const neighbors = [];

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(n => !n.isVisited);
}

const sortNodesByDistance = (nodes) => {
  return nodes.sort((a, b) => a.distance - b.distance);
}