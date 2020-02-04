import Grid from './models/Grid.js'
import * as gridView from './views/gridView.js'

const NUM_OF_ROWS = 10;
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

  // console.log(state.grid);
}

document.addEventListener('DOMContentLoaded', () => {
  controlGrid();
  setupEventListeners();
})

const handleWallDraw = (tile) => {
  const {
    row,
    col
  } = tile.dataset

  if (!tile.className.includes('tile--wall') && !tile.className.includes('tile--start') && !tile.className.includes('tile--target') && !state.startPressedDown) {
    tile.classList.add('tile--wall');
    state.grid.addWall(row, col);
  }
};

const setupEventListeners = () => {
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mousedown', () => {
      handleWallDraw(tile);
    })

    tile.addEventListener('mouseover', (e) => {
      if (e.buttons === 1) {
        handleWallDraw(tile)
      }
    })
  })

  document.querySelector('.start__button').addEventListener('click', () => {
    console.log(state.grid.walls);
  })
}