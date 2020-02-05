import Grid from './models/Grid.js'
import * as gridView from './views/gridView.js'
import * as dijkstra from '../algorithms/Dijkstra.js'

const NUM_OF_ROWS = 15;
const NUM_OF_COLUMNS = 15;

// global state
let state = {}

////////////////// GRID CONTOLLER //////////////////
const controlGrid = () => {
  state.grid = new Grid(NUM_OF_ROWS, NUM_OF_COLUMNS);
  state.grid.setInititalGrid();

  // default start and target nodes
  state.grid.setInitialStartNode();
  state.grid.setInitialTargetNode();

  // prepare UI for grid
  gridView.clearGrid();

  // render new grid
  gridView.displayGrid(state.grid.grid);
}

document.addEventListener('DOMContentLoaded', () => {
  controlGrid();
  setupEventListeners();
})

const handleWallDraw = tile => {
  const {
    row,
    col
  } = tile.dataset

  if (!tile.className.includes('tile--start') && !tile.className.includes('tile--target')) {
    tile.classList.add('tile--wall');
    state.grid.addWall(row, col);
  }
};

const setupEventListeners = () => {
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mousedown', (e) => {
      if (!tile.className.includes('tile--wall')) {
        handleWallDraw(tile);
      }
    })

    tile.addEventListener('mouseover', (e) => {
      if (e.buttons === 1 && !tile.className.includes('tile--wall') && !state.startDown) {
        handleWallDraw(tile)
      }
    })
  })

  document.querySelector('.start__button').addEventListener('click', () => {
    const visitedNodes = dijkstra.visitedNodesInOrder(state.grid.grid, state.grid.startNode, state.grid.targetNode, state.grid.walls);
    const shortestPath = dijkstra.getShortestPath(state.grid.targetNode);

    // clean up this messy code
    // extract into one or two functions and import from gridView.js
    visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        gridView.animateNode(node, 'tile--visited');
        if (i === visitedNodes.length - 1) {
          timeout();
          // toggle is animating property here
        }
      }, 30 * i);

      const timeout = () => {
        shortestPath.forEach((node, i) => {
          setTimeout(() => {

            gridView.animateNode(node, 'tile--path');
            // toggle is animating property here

          }, 30 * i);
        })
      }
    })

    console.log(shortestPath);
  })
}