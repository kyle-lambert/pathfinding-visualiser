// import dijkstraAlgorithm from './algorithms/dijkstra.js'

// function setupGraph(cols, rows) {
//   const graph = new Array(cols);

//   function Node(col, row) {
//     this.col = col;
//     this.row = row;
//     this.distance = Infinity;
//     this.isVisited = false;
//   }
//   for (let i = 0; i < rows; i++) {
//     graph[i] = new Array(cols);
//   }

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       graph[i][j] = new Node(i, j);
//     }
//   }
//   return graph;
// };


// function renderGraph(cols, rows) {
//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       let node = `<div class='node' data-col=${i} data-row=${j} ></div>`;
//       document.getElementById('graph').insertAdjacentHTML('beforeend', node);
//     }
//   }
// }

// function removeIsStart(graph) {
//   graph.forEach(col => {
//     col.forEach(node => {
//       if (node.isStart) delete node.isStart;
//     })
//   })
// }

// function removeStartClass(elements) {
//   elements.forEach(el => el.classList.remove('node--start'));
// }

// function controller() {
//   const COLS_NUM = 5;
//   const ROWS_NUM = 5;
//   let startNode;

//   // Setup 2D grid
//   const graph = setupGraph(COLS_NUM, ROWS_NUM);

//   // Render nodes to UI
//   renderGraph(COLS_NUM, ROWS_NUM);

//   // Add events to all screen nodes
//   const elements = document.querySelectorAll('.node');

//   elements.forEach(el => {
//     el.addEventListener('click', (e) => {
//       const col = parseInt(e.target.dataset.col);
//       const row = parseInt(e.target.dataset.row);
//       removeStartClass(elements);
//       removeIsStart(graph);

//       el.classList.add('node--start');
//       graph[col][row].isStart = true;
//       startNode = graph[col][row];

//       console.log(startNode);
//     })
//   })

//   const dijkstraButton = document.getElementById('dijkstraBtn');

// }

// controller();








/// WORKING BELOW

// const ROW_NUM = 5;
// const COL_NUM = 10


// function setup(rows, cols) {
//   const graph = new Array(rows);

//   function Node(row, col) {
//     this.row = row;
//     this.col = col;
//     this.distance = Infinity;
//     this.isVisited = false;
//   }

//   for (let i = 0; i < rows; i++) {
//     graph[i] = new Array(cols);
//   }

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       graph[i][j] = new Node(i, j);
//     }
//   }

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       let node = `<div class='node' data-row=${i} data-col=${j} ></div>`;
//       document.getElementById('graph').insertAdjacentHTML('beforeend', node);
//     }
//   }
//   console.log(graph);
//   return graph
// }

class Model {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
  }

  initialise() {
    const graph = new Array(this.rows);

    function Node(row, col) {
      this.row = row;
      this.col = col;
      this.distance = Infinity;
      this.isVisited = false;
    }

    for (let i = 0; i < this.rows; i++) {
      graph[i] = new Array(this.cols);
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        graph[i][j] = new Node(i, j);
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let node = `<div class='node' data-row=${i} data-col=${j} ></div>`;
        document.getElementById('graph').insertAdjacentHTML('beforeend', node);
      }
    }
    this.graph = graph;
  }
}

class View {
  constructor() {

  }
}

function controller() {
  const ROW_NUM = 5;
  const COL_NUM = 10;

  const model = new Model(ROW_NUM, COL_NUM);

  model.initialise();
  const graph = model.graph;

  console.log(graph);
}

controller();

// setup(ROW_NUM, COL_NUM);