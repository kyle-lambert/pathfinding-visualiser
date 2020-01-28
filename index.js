import Board from './models/Board.js'
import * as boardView from './views/boardView.js'
import {
  dijkstra,
  getNodesInShortestPath
} from './algorithms/dijkstra.js'

const state = {};

const setupBoard = () => {
  state.board = new Board();
  // initialise board, start and end nodes
  state.board.init();
  // display board to UI
  for (let i = 0; i < state.board.rows; i++) {
    for (let j = 0; j < state.board.cols; j++) {
      boardView.renderNode(state.board.allNodes[i][j])
    }
  }
}

const controlDijkstra = () => {
  const visitedNodesInOrder = dijkstra(state.board.allNodes, state.board.startNode, state.board.endNode);
  visitedNodesInOrder.forEach((node, index) => {
    const id = node.id
    setTimeout(() => {
      if (state.board.startNode !== node && state.board.endNode !== node) {
        state.board.setClassListByID(id, 'cell--picked')
      }
    }, index * 10);
  })

  setTimeout(() => {
    const nodesInShortestPath = getNodesInShortestPath(state.board.endNode);
    nodesInShortestPath.forEach((node, index) => {
      const id = node.id
      setTimeout(() => {
        if (state.board.startNode !== node && state.board.endNode !== node) {
          state.board.setClassListByID(id, 'cell--shortest')
        }
      }, index * 5);
    })
  }, visitedNodesInOrder.length * 10);
}








document.addEventListener('DOMContentLoaded', () => {
  setupBoard();
})

document.querySelector('.start__button').addEventListener('click', () => {
  controlDijkstra();
})