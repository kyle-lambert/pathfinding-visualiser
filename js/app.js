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

// document.querySelector('.grid__container').addEventListener('click', (e) => {
//   const id = e.target.id;
//   const row = e.target.dataset.row;
//   const col = e.target.dataset.col;

//   // check make sure user hasnt click on a start or target node
//   if (!state.grid.isStartNode(id) && !state.grid.isTargetNode(id)) {
//     if (state.grid.isWallNode(id)) {
//       // remove wall
//       state.grid.removeWall(row, col);
//     } else {
//       // add wall
//       state.grid.addWall(row, col);
//     }
//     // prepare UI for grid
//     gridView.clearGrid();

//     // display updated grid
//     gridView.displayGrid(state.grid.grid);

//     console.log(state.grid)
//   }

// })

const setupEventListeners = () => {
  document.querySelector('.grid__container').addEventListener('mousedown', (e) => {
    if (e.target.matches('.tile')) {
      if (e.target.className.includes('tile--wall')) {
        e.target.classList.remove('tile--wall');
      } else {
        e.target.classList.add('tile--wall');
      }
    }

  })

  document.querySelector('.grid__container').addEventListener('mouseover', (e) => {
    if (e.target.matches('.tile')) {
      if (e.buttons === 1) {
        if (e.target.className.includes('tile--wall')) {
          e.target.classList.remove('tile--wall');
        } else {
          e.target.classList.add('tile--wall');
        }
      }
    }
  })

  document.querySelector('.grid__container').addEventListener('click', (e) => {
    document.querySelectorAll('.tile').forEach(tile => {
      if (tile.className.includes('tile--wall')) {
        const row = tile.dataset.row;
        const col = tile.dataset.col;


      }
    })
  })


}