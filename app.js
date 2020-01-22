const Node = function (row, col) {
  this.row = row;
  this.col = col;
  this.distance = Infinity;
  this.isVisited = false;
  this.isStart = false;
  this.isEnd = false;
  this.id = `${row}${col}`
}

const graphController = (function () {
  let data = {
    rows: 5,
    cols: 10,
  }


  const build2dArray = function (rows, cols) {
    const graph = new Array(rows);

    for (let i = 0; i < rows; i++) {
      graph[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        graph[i][j] = new Node(i, j);
      }
    }
    return graph;
  }

  const flatten2dArray = function (graph) {
    return graph.reduce((acc, cur) => acc.concat(cur));
  }

  const defaultStartProp = function (graph) {
    return flatten2dArray(graph).forEach(cur => cur.isStart = false);
  }

  const filterById = function (id, graph) {
    return flatten2dArray(graph).filter(cur => cur.id === id);
  }

  return {
    data: {
      rows: data.rows,
      cols: data.cols,
      graph: build2dArray(data.rows, data.cols)
    },
    filterById: filterById,
    defaultStartProp: defaultStartProp

  }
})();

const viewController = (function () {
  const DOMstrings = {
    graphWrapper: 'graph',
    startButton: 'startButton',
    cell: '.cell'
  }

  const renderCells = function (rows, cols) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let cell = `<div class='cell' id=${i}${j} data-row=${i} data-col=${j} ></div>`;
        document.getElementById(DOMstrings.graphWrapper).insertAdjacentHTML('beforeend', cell);
      }
    }
  }
  return {
    render: renderCells,
    DOM: DOMstrings
  }
})();

const controller = (function (graphCtrl, viewCtrl) {
  const init = function () {
    viewCtrl.render(graphCtrl.data.rows, graphCtrl.data.cols);
    setupEventListeners();
  }

  const setupEventListeners = function () {
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', updateStartNode)
    });

  }

  const updateStartNode = function (e) {
    const cell = e.target
    const id = cell.id;
    const gNode = graphCtrl.filterById(id, graphCtrl.data.graph);

    // default all start props back to false
    graphCtrl.defaultStartProp(graphCtrl.data.graph);
    // update start node property
    gNode.isStart = true;
    // remove start styles from every  cell
    document.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('cell--start');
    })
    // add styles to current start cell
    cell.classList.add('cell--start');
  }

  return {
    init: init
  }

})(graphController, viewController);
controller.init();