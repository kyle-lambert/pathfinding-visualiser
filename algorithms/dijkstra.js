export default function dijkstra(graph, start) {
  const startNode = start;

  if (!graph) alert('Graph is empty');
  if (!startNode) alert('No start node');

  const visitedNodesInOrder = [];
  let unvistedNodes = getAllNodes(graph);

  startNode.distance = 0;

  while (unvistedNodes.length > 0) {
    sortNodesByDistance(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbors(closestNode, graph);
  }
  // console.log(visitedNodesInOrder);
  return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, graph) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, graph);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, graph) {
  const neighbors = [];
  const {
    col,
    row
  } = node;
  if (row > 0) neighbors.push(graph[row - 1][col]);
  if (row < graph.length - 1) neighbors.push(graph[row + 1][col]);
  if (col > 0) neighbors.push(graph[row][col - 1]);
  if (col < graph[0].length - 1) neighbors.push(graph[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByDistance(unvistedNodes) {
  unvistedNodes.sort((a, b) => a.distance - b.distance);
}

function getAllNodes(graph) {
  const nodes = [];
  graph.forEach(col => {
    col.forEach(node => {
      nodes.push(node);
    });
  })
  return nodes;
}