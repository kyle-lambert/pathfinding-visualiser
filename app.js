const graphController = (function () {
  let data = {
    rows: 5,
    cols: 10
  }

  const Node = function (row, col) {
    this.row = row;
    this.col = col;
    this.distance = Infinity;
    this.isVisited = false;
    this.isStart = false;
    this.isEnd = false;
    this.id = `${row}${col}`
  }

  const getGraph = function (rows, cols) {
    const graph = new Array(rows);

    for (let i = 0; i < rows; i++) {
      graph[i] = new Array(cols);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        graph[i][j] = new Node(i, j);
      }
    }
    return graph;
  }

  const updateIsStart = function (node, graph) {
    for (let i = 0; i < data.rows; i++) {
      for (let j = 0; j < data.cols; j++) {
        graph[i][j].isStart = false;
      }
    }
    node.isStart = true;
  }


  return {
    data: {
      rows: data.rows,
      cols: data.cols,
      graph: getGraph(data.rows, data.cols)
    },
    getNodeById: function (id, graph) {
      for (let i = 0; i < data.rows; i++) {
        for (let j = 0; j < data.cols; j++) {
          if (graph[i][j].id === id) return graph[i][j];
        }
      }
    },
    updateNodeIsStart: updateIsStart
  }
})();

const viewController = (function () {
  const DOM = {
    container: document.getElementById('graph')
  }

  return {
    displayGraph: function (rows, cols, graph) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let cell = `<div class='node' id=${i}${j} data-row=${i} data-col=${j} ></div>`;
          DOM.container.insertAdjacentHTML('beforeend', cell);
        }
      }
    },
    DOM: DOM
  }
})();

const controller = (function (graphCtrl, viewCtrl) {
  const setupEventListeners = function () {

    viewCtrl.DOM.container.addEventListener('click', (e) => {
      const isNode = e.target.className.includes('node');
      const cell = e.target;

      if (isNode) {
        const id = e.target.id;
        const node = graphCtrl.getNodeById(id, graphCtrl.data.graph);

        graphCtrl.updateNodeIsStart(node, graphCtrl.data.graph);

        viewCtrl.DOM.container.querySelectorAll('.node').forEach(cell => {
          cell.classList.remove('node--start');
        });

        cell.classList.add('node--start');
      }
    })
  }

  return {
    init: function () {
      const {
        rows,
        cols,
        graph
      } = graphCtrl.data;

      viewCtrl.displayGraph(rows, cols, graph);

      setupEventListeners();
    }
  }

})(graphController, viewController);
controller.init();