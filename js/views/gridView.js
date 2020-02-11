export const displayGrid = grid => {
  clearGrid();

  const flat = grid.reduce((acc, cur) => acc.concat(cur));
  flat.forEach(node => {
    const tile = document.createElement('div');
    tile.id = node.id;
    tile.classList.add('tile');
    tile.setAttribute('data-row', node.row);
    tile.setAttribute('data-col', node.col);

    if (node.isStart) tile.classList.add('tile--start')
    if (node.isTarget) tile.classList.add('tile--target')
    if (node.isWall) tile.classList.add('tile--wall');

    document.querySelector('.grid__container').appendChild(tile);
  })
}

export const clearGrid = () => {
  document.querySelector('.grid__container').innerHTML = '';
}

// todo: separate this into two seperate functions
// one for animating visited nodes and other for animating shortest path

export const animateVisitedNode = (node) => {
  const id = `${node.row}-${node.col}`;
  document.getElementById(id).classList.add('tile--visited');
}

export const animateShortestPathNode = (node) => {
  const id = `${node.row}-${node.col}`;
  const tile = document.getElementById(id);

  if (node.isVisited) {
    tile.classList.remove('tile--visited');
  }
  if (!node.isStart && !node.isTarget) {
    tile.classList.add('tile--path');
  }
}