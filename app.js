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

  const filterById = function (id) {
    const graph = getGraph(data.rows, data.cols)
    for (let i = 0; i < data.rows; i++) {
      for (let j = 0; j < data.cols; j++) {
        if (graph[i][j].id === id) return graph[i][j];
      }
    }
  }

  return {
    getData: function () {
      return {
        rows: data.rows,
        cols: data.cols,
        graph: getGraph(data.rows, data.cols)
      }
    },
    getNode: function (id) {
      return filterById(id);
    },
  }
})();

const viewController = (function () {
  const elements = {
    container: document.getElementById('graph')
  }

  const clearContainer = function () {
    elements.container.innerHTML = '';
  }

  return {
    displayGraph: function (rows, cols, graph) {
      clearContainer();
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let node = `<div class='node' id=${i}${j} data-row=${i} data-col=${j} ></div>`;
          if (graph[i][j].isStart) {
            node = `<div class='node node--start' id=${i}${j} data-row=${i} data-col=${j} ></div>`;
          }
          if (graph[i][j].isEnd) {
            node = `<div class='node node--end' id=${i}${j} data-row=${i} data-col=${j} ></div>`;
          }
          elements.container.insertAdjacentHTML('beforeend', node);
        }
      }
    },
    getElements: function () {
      return elements;
    }
  }
})();

const controller = (function (graphCtrl, viewCtrl) {
  const {
    rows,
    cols,
    graph
  } = graphCtrl.getData();

  const setupEventListeners = function () {
    const elements = viewCtrl.getElements();

    elements.container.addEventListener('click', (e) => {
      const isNode = e.target.className.includes('node');

      if (isNode) {
        const id = e.target.id;
        const node = graphCtrl.getNode(id);
        console.log(node)
      }
    })
  }

  return {
    init: function () {

      viewCtrl.displayGraph(rows, cols, graph);

      setupEventListeners();
    }
  }

})(graphController, viewController);
controller.init();