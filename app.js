const rows = 5;
const cols = 5;
const grid = new Array(rows);

setup();

function setup() {
  function Node(row, col) {
    this.col = col;
    this.row = row;
    this.distance = Infinity;
    this.isVisited = false;
    this.isStart = col === 0 && row === 2;
    this.isEnd = col === 4 && row === 2;
  }

  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Node(i, j);
    }
  }

  function displayGrid(grid) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let element = `<div class='node' data-node='${i}${j}'></div>`;
        if (grid[i][j].isStart) element = `<div class='node node--start' data-node='${i}${j}'></div>`;
        if (grid[i][j].isEnd) element = `<div class='node node--end' data-node='${i}${j}'></div>`;
        document.getElementById('grid').insertAdjacentHTML('beforeend', element);
      }
    }
  }
  displayGrid(grid);
}

function dijkstra(grid) {
  const visitedNodesInOrder = [];
  let unvistedNodes = getAllNodes(grid);
  let startNode = unvistedNodes.filter(n => n.isStart);

  startNode[0].distance = 0;

  while (unvistedNodes.length > 0) {
    sortNodesByDistance(unvistedNodes);
    const closestNode = unvistedNodes.shift();
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbors(closestNode, grid);
  }

  // console.log(visitedNodesInOrder);
  const UInodes = document.querySelectorAll('.node');

  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    const UIcord = [(parseInt(UInodes[i].dataset.node[0])), (parseInt(UInodes[i].dataset.node[1]))];
    const cord = [visitedNodesInOrder[i].row, visitedNodesInOrder[i].col]

    if (UIcord === cord) {
      console.log(UInodes[i]);
    }
  }

}





dijkstra(grid);

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {
    col,
    row
  } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortNodesByDistance(unvistedNodes) {
  unvistedNodes.sort((a, b) => a.distance - b.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nodes.push(grid[i][j]);
    }
  }
  return nodes;
}



















// const grid = [];

// for (let row = 1; row <= 20; row++) {
//   let currentRow = [];
//   for (let col = 1; col <= 20; col++) {
//     let currentNode = {
//       row,
//       col,
//       isVisited: false,
//       isInitial: row === 10 && col === 1,
//       distance: row === 10 && col === 1 ? 0 : Infinity
//     }
//     currentRow.push(currentNode);
//   }
//   grid.push(currentRow);
// }

// class Dijkstra {
//   constructor(grid) {
//     this.grid = grid;
//     this.unvistedSet = [];
//     this.initialNode;
//   }

//   getUnvisitedSet() {
//     this.grid.forEach(row => {
//       row.forEach(node => {
//         this.unvistedSet.push(node);
//       })
//     })
//   }

//   getInitialNode() {
//     const initial = this.unvistedSet.filter(node => node.isInitial);
//     this.initialNode = initial;
//   }
// }

// const runDijkstra = function () {
//   const dijkstra = new Dijkstra(grid);

//   let unvistedSet = dijkstra.getUnvisitedSet();
//   let initialNode = dijkstra.getInitialNode();
//   let currentNode = initialNode;

//   console.log(dijkstra);
// }

// runDijkstra();






// const displayNodes = function (nodes) {
//   nodes.forEach(node => {
//     let currentNode = `<div class='node'></div>`
//     if (node.isStartNode) {
//       currentNode = `<div class='node node--start'></div>`;
//     }
//     if (node.isEndNode) {
//       currentNode = `<div class='node node--end'></div>`;
//     }
//     document.getElementById('grid').insertAdjacentHTML('beforeend', currentNode);
//   })
// }
// displayNodes(fullNodesArray);




// const getStartNode = function (nodes) {
//   let startNode;
//   nodes.forEach(node => {
//     return node.isStartNode ? startNode = node : null
//   });
//   return startNode;
// }
// console.log(fullNodesArray);
// console.log(getStartNode(fullNodesArray))

// const getEndNode = function (nodes) {
//   let endNode;
//   nodes.forEach(row => {
//     row.forEach(node => {
//       if (node.isEndNode) {
//         endNode = node;
//       }
//     })
//   })
//   return endNode;
// }

// const startNode = getStartNode(nodesArray);
// const endNode = getEndNode(nodesArray);

// console.log(startNode);
// console.log(endNode);





// const dijkstra = function (nodes, start, end) {
//   start.distance = 0;
//   console.log(start);

//   console.log(nodes.sort());
// }

// dijkstra(nodesArray, startNode, endNode);

// document.querySelectorAll('.node').forEach(node => {
//   node.addEventListener('click', (e) => {
//     const startNode = e.target;

//     console.log(startNode);
//     startNode.classList.add('node--start');
//   })
// })