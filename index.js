import Grid from './components/Grid.js'
import {
  dijkstra,
  getShortestPath
} from './algorithms/dijkstra.js';


class Controller {
  constructor() {
    this.grid = new Grid();
  }

  init() {
    this.grid.initialiseGrid();
    this.grid.renderGrid();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.querySelector('.start__button').addEventListener('click', () => {
      const nodesVisited = dijkstra(this.grid.nodes, this.grid.startNode, this.grid.targetNode);
      const shortestPath = getShortestPath(this.grid.targetNode);
      this.grid.setNodesVisited(nodesVisited);
      this.grid.setShortestPath(shortestPath);
      this.grid.animateVisitedNodes();
      this.grid.animateShortestPath();
    })
  }
}

const controller = new Controller();
controller.init();

console.log(controller);