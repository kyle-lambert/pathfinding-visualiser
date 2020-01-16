const allNodes = [];

for (let row = 1; row <= 20; row++) {
  let currentRow = [];
  for (let col = 1; col <= 20; col++) {
    let currentNode = {
      row,
      col
    }
    currentRow.push(currentNode);
  }
  allNodes.push(currentRow);
}

allNodes.map(row => {
  row.map(node => {
    let currentNode = `<div class='node'></div>`

    if (node.row === 10 && node.col === 1) {
      currentNode = `<div class='node node--start'></div>`
    }
    if (node.row === 10 && node.col === 20) {
      currentNode = `<div class='node node--end'></div>`
    }

    console.log(node);
    document.getElementById('grid').insertAdjacentHTML('beforeend', currentNode);
  })
})