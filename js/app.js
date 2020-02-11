import Grid from './models/Grid.js'
import * as gridView from './views/gridView.js'
import * as dijkstra from '../algorithms/Dijkstra.js'

const NUM_OF_ROWS = 15;
const NUM_OF_COLUMNS = 15;

// global state
let state = {}

////////////////// GRID CONTOLLER //////////////////


// initialise the grid and store in state
const initialiseGrid = () => {
  state.grid = new Grid(NUM_OF_ROWS, NUM_OF_COLUMNS);
  state.grid.setInititalGrid();
}

document.addEventListener('DOMContentLoaded', () => {
  // store defauldt grid in state
  initialiseGrid();

  // render grid to ui
  gridView.displayGrid(state.grid.grid);
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

const controlDijkstra = () => {
  const visitedNodes = dijkstra.visitedNodesInOrder(state.grid.grid, state.grid.startNode, state.grid.targetNode);
  const shortestPath = dijkstra.getShortestPath(state.grid.targetNode);
  const animationSpeed = state.grid.animationSpeed;

  console.log(shortestPath);

  // algo started
  state.grid.setAlgoRunning(true);
  console.log(state.grid.algoRunning);

  visitedNodes.forEach((node, i) => {
    setTimeout(() => {
      gridView.animateVisitedNode(node);
      if (i === visitedNodes.length - 1) {
        timeout();
      }
    }, animationSpeed * i);

    const timeout = () => {
      if (shortestPath.length > 0) {
        shortestPath.forEach((node, i) => {
          setTimeout(() => {
            gridView.animateShortestPathNode(node);

            if (i === shortestPath.length - 1) {
              // algo finished
              state.grid.setAlgoRunning(false);
              console.log(state.grid.algoRunning);
            }
          }, animationSpeed * i);
        })
      } else {
        state.grid.setAlgoRunning(false);
      }
    }
  })
}

document.querySelector('.grid__container').addEventListener('mousedown', (e) => {
  if (e.target.matches('.tile') && !state.grid.algoRunning) {
    const tile = e.target;

    if (!tile.className.includes('tile--wall')) {
      handleWallDraw(tile);
    }
  }
})


document.querySelector('.grid__container').addEventListener('mouseover', (e) => {
  if (e.target.matches('.tile') && !state.grid.algoRunning) {
    const tile = e.target;

    if (e.buttons === 1 && !tile.className.includes('tile--wall') && !state.startDown) {
      handleWallDraw(tile)
    }
  }
})

document.querySelector('.start__button').addEventListener('click', () => {
  if (!state.grid.algoRunning) {
    state.grid.resetNodeProps();
    gridView.displayGrid(state.grid.grid);

    // if dijkstra is selected
    controlDijkstra();
  }
})


document.querySelector('.clear__button').addEventListener('click', () => {
  if (!state.grid.algoRunning) {
    initialiseGrid();
    gridView.displayGrid(state.grid.grid);
  }
})

// const setupEventListeners = () => {
//   document.querySelectorAll('.tile').forEach(tile => {
//     tile.addEventListener('mousedown', (e) => {
//       if (!tile.className.includes('tile--wall')) {
//         handleWallDraw(tile);
//       }
//     })

//     tile.addEventListener('mouseover', (e) => {
//       if (e.buttons === 1 && !tile.className.includes('tile--wall') && !state.startDown) {
//         handleWallDraw(tile)
//       }
//     })
//   })

//   document.querySelector('.start__button').addEventListener('click', () => {
//     if (!state.grid.algoRunning) {
//       console.log('fdsfsdfs');
//       controlDijkstra();
//     }
//   })


//   // document.querySelector('.clear-grid__button').addEventListener('click', () => {
//   //   if (!state.grid.algoRunning) {
//   //     handleClearGrid();
//   //   }
//   // })
// }