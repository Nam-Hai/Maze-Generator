// Coding Challenge from https://www.youtube.com/watch?v=HyK_Q5rrcr4&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=10
// algorithm from Maze generation algorithm https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
// Recursive implementation

const cols = 15, rows = 15;
let w = 40;
let grid = [];
let curCell;

let pile = [];

function setup() {
  createCanvas(cols * w, rows * w).addClass('padding');

  frameRate(15)

  // Creation de l'echiquier
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  curCell = grid[0]
}

function draw() {
  background(200);
  grid.forEach(cell => {
    cell.show();
  });

  curCell.visited = true;
  curCell.highlight();

  // 1. Choose randomly one of the unvisited neighboors
  let next = curCell.checkNeighbors();


  if (next) {
    next.visited = true;

    // 2. Push the current cell to the stack
    pile.push(curCell);

    // 3. Remove the wall between the current cell and the chosen cell
    removeWalls(curCell, next);
    // 4. Make the chosen cell the current cell and mark it as visted
    curCell = next;
  } else if (pile.length > 0) {
    curCell = pile.pop();
  } else {
    console.log('FINI ! Nous avons là un bien beau labyrinthe');
    noLoop();
  }
}

function getIndex(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1
  }
  return i + j * cols
}



function removeWalls(cellA, cellB) {
  let x = cellA.i - cellB.i;

  if (x == 1) {
    cellA.walls[3] = false;
    cellB.walls[1] = false;
  } else if (x == -1) {
    cellA.walls[1] = false;
    cellB.walls[3] = false;
  }

  let y = cellA.j - cellB.j;

  if (y == 1) {
    cellA.walls[0] = false;
    cellB.walls[2] = false;
  } else if (y == -1) {
    cellA.walls[2] = false;
    cellB.walls[0] = false;
  }
}