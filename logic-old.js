const GameBoard = {
  board: [],
  players: {
    playerA: null,
    playerB: null, 
  },
}

function createPlayer (name, symbol) {
  const mark = symbol;
  let score = 0;
  let isTurn = 0;
  return { name, mark, score, isTurn };
}

function Cell (cellNum, row, col) {
  const cell = cellNum;
  const pos = { row, col };
  let val = null;
  return { cell, pos, val };
}

function drawBoard () {
  let num = 1;

  for (row = 0; row < 3; row++) {
    for (col = 0; col < 3; col++) {
      let cell = Cell(num, row, col);
      GameBoard["board"].push(cell);
      num++;
    }
  }
}

// 3. start the game
function chooseTurn () {
  let playerA = GameBoard.players.playerA;
  let playerB = GameBoard.players.playerB;

  while (playerA.isTurn === playerB.isTurn) {
    playerA.isTurn = Math.floor(Math.random() * 2);
    playerB.isTurn = Math.floor(Math.random() * 2);
    
    if (playerA.isTurn > playerB.isTurn) {
      playerA.isTurn = 1;
      return playerA;
    } else if (playerB.isTurn > playerA.isTurn) {
      playerB.isTurn = 1;
      return playerB;
    }
  }
}

// a. player 1 choose a cell
function getPosition () {
  const prompt = require("prompt-sync")({sigint: true});

  let input1 = parseInt(prompt("Choose a row: "));
  let input2 = parseInt(prompt("Choose a column: "));
  return [ input1, input2 ];
}

// b. find the cell on the gameboard
function findCell (coords) {
  const gameboard = GameBoard.board;
  gameboard.forEach((cell) => {
    if (
      cell && (
      cell.pos['row'] === coords[0] &&
      cell.pos['col'] === coords[1])
    ) {
      console.log(cell);
      return cell;
    }
  });
}

// c. put down symbol
function addSymbol (players, cell) {
  
  console.log(`Cell current value is ${cell.val} and current player is ${player}`);
  cell.val = player.symbol;
  console.log(cell);
  // console.log(`Cell new value is ${cell.val} and next player is ${player}`);

}
// d. store player's info on that cell 
// e. switch turn
// d. repeat

// console.log(GameBoard.players);
// let coords = getPosition();
// console.log(`${typeof coords} and row is ${coords[0]} and col is ${coords[1]}`);
// console.log(`chosen cell is at ${coords}`);
// findCell(coords);


// 1. create players and add to GameBoard
let personA = createPlayer("Jales", "X");
let personB = createPlayer("Lettuce", 'O');
GameBoard.players.playerA = personA;
GameBoard.players.playerB = personB;

// 2. create the gameboard
drawBoard();
chooseTurn();
let coords = getPosition();
let currCell = findCell(coords);
addSymbol(GameBoard.players, currCell);

console.log(coord);
console.log(currCell);
console.log(GameBoard.players);






