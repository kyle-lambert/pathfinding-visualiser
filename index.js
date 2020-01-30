import Grid from './components/Grid.js'
// import {
//   dijkstra,
//   getShortestPath
// } from './algorithms/Dijkstra.js';
import Dijkstra from './algorithms/Dijkstra.js'


class Controller {
  constructor() {
    this.grid = new Grid();
    this.isDijkstra = true;
  }

  init() {
    this.grid.initialiseGrid();
    this.grid.renderGrid();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelector('.start__button').addEventListener('click', () => {
      if (this.isDijkstra) {
        const dijkstra = new Dijkstra();
        dijkstra.runDijkstra(this.grid.nodes, this.grid.startNode, this.grid.targetNode);
        const nodesVisited = dijkstra.visitedNodeInOrder;
        console.log(nodesVisited);
        this.grid.setNodesVisited(nodesVisited);
        this.grid.animateVisitedNodes();

      }

      // const nodesVisited = dijkstra(this.grid.nodes, this.grid.startNode, this.grid.targetNode);
      // const shortestPath = getShortestPath(this.grid.targetNode);
      // this.grid.setShortestPath(shortestPath);
      // this.grid.animateShortestPath();
    })
  }
}

const controller = new Controller();
controller.init();

// console.log(controller);