export const renderNode = (node) => {
  let html = `<div class='cell' id=${node.row}-${node.col} data-row=${node.row} data-col=${node.col} ></div>`;
  if (node.isStart) html = `<div class='cell cell--start' id=${node.row}-${node.col} data-row=${node.row} data-col=${node.col} ></div>`
  if (node.isEnd) html = `<div class='cell cell--end' id=${node.row}-${node.col} data-row=${node.row} data-col=${node.col} ></div>`
  document.querySelector('.board__container').insertAdjacentHTML('beforeend', html)
}