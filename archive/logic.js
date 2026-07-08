const GameBoard = {
  board: [],
  score: 0,
  players: {
  },
}

function Player (name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.isTurn = 0;
}

function CreatePlayer() {
  const players = GameBoard.players;
  
  this.create = (name, symbol) => {
    players[name] = new Player(name, symbol);
  }
}

function Cell (cellNum, row, col) {
  this.cell = cellNum;
  this.pos = { row, col };
  this.val = 0;
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

//assign the turn randomly by giving user a random value between 1 and 2: 1 goes first, 2 goes second
function assignTurn() {
  const playersList = GameBoard.players;
  const playersKeys = Object.keys(playersList);
  let total = 0;

  while (total !== 3) {
    total = 0;
    playersKeys.forEach((key) => {
      playersList[key].isTurn = Math.floor(Math.random() * 2 + 1);
      total += playersList[key].isTurn;
    })
  }
}

function updateTurns() {
  const players = GameBoard.players;
  for (const player in players) {
    switch (players[player].isTurn) {
      case 1:
        players[player].isTurn = 2;
        break;
      case 2: 
        players[player].isTurn = 1;
        break;
    }
  }
}

function getCurrPlayer() {
  const players = GameBoard.players;
  for (const player in players) {
    if (players[player].isTurn === 1) {
      return player;
    }
  }
}

//when player chooses a cell
function getPosition() {
  const prompt = require("prompt-sync")({sigint: true});

  let input1 = parseInt(prompt("Choose a row: "));
  let input2 = parseInt(prompt("Choose a column: "));
  return [ input1, input2 ];
}

function findCell (coords) {
  const gameboard = GameBoard.board;
  const found = gameboard.find((cell) => {
    if (
      cell && (
      cell.pos['row'] === coords[0] &&
      cell.pos['col'] === coords[1])
    ) {
      return cell;
    }
  })
  return found;
}

function isEmpty (cell) {
  return cell.val === 0 ? true : false;
}

function isSame (cell1, cell2) {
  return cell1.val === cell2.val ? true : false;
}

function isChecked(array, neighborCell) {
  return array.find(cell => cell.cell === neighborCell.cell);
}

function addScore(score) {
  return score++;
}

function updateCell(cell) {
    const player = getCurrPlayer();
    cell["val"] = GameBoard.players[player].symbol;
    console.log("****** updated current cell: ")
    console.log(cell);
}

function initialize() {
  const playersFactory = new CreatePlayer();
  playersFactory.create("Kales", "X");
  playersFactory.create("Sora", "O");

  drawBoard();
  assignTurn();
}

function findAdjacent(cell) {
  let arr = [];
  let currRow = cell.pos.row;
  let currCol = cell.pos.col;
  for (let i = currRow - 1; i <= currRow + 1; i++) {
    for (let j = currCol - 1; j <= currCol + 1; j++) {
      arr.push([i, j]);
    }
  }
  return arr;
}

//check if's the cell itself

function checkOK(currentCell, neighborCell) {
  if (!isEmpty(neighborCell) && isSame(currentCell, neighborCell)) {
    return true;
  } else return false;
}

function checkRow(existArr, currentCell) {
  let check = false;
  existArr.forEach((cell) => {
    if (currentCell.pos.row === cell.pos.row) {
      check = true;
    } else {
      check = false;
    }

    if (currentCell.pos.col === cell.pos.col) {
      check = true;
    } else {
      check = false;
    }
  })
  return check;
}

function checkCol(existArr, currentCell) {
  let check = false;
  existArr.forEach((cell) => {
    if (currentCell.pos.col === cell.pos.col) {
      check = true;
    } else {
      check = false;
    }
  })
  return check;
}

function checkValidWin(existArr, currentCell) {
  let valid = false;
  
}

 
function checkWin(existArr, currentCell) {
  let matchArr = findAdjacent(currentCell);
  let board = GameBoard.board;

  if (existArr.length === 0) existArr.push(currentCell);

  console.log("********************")
  matchArr.forEach((matchCell) => {
    let foundNeighbor = board.find((cell => (matchCell[0] === cell.pos.row) && (matchCell[1] === cell.pos.col)));
    if (foundNeighbor && (foundNeighbor.cell !== currentCell.cell)) {
      if (checkOK(currentCell, foundNeighbor)) {
        if (!isChecked(existArr, foundNeighbor)) {
          if (checkRow(existArr, foundNeighbor)) {
            existArr.push(foundNeighbor);
            GameBoard.score++;
            console.log(`Score: ${GameBoard.score}`)
            console.log("Exist Array: ")
            console.log(existArr)
            checkWin(existArr, foundNeighbor);
          }}
        }
      }
    })
  }
  // matchArr.forEach((matchCell) => {
  //   let foundNeighbor = board.find((cell => (matchCell[0] === cell.pos.row) && (matchCell[1] === cell.pos.col)))
  //   if ((foundNeighbor) && //if neighbor cells exist in gameboard and it's not the current cell
  //      ((foundNeighbor["pos"]["row"] !== currentCell["pos"]["row"]) && 
  //        (foundNeighbor["pos"]["col"] !== currentCell["pos"]["col"]))) {
  //         console.log('test')
  //         console.log(foundNeighbor)
          // console.log(currentCell)
          // if (checkOK(currentCell, foundNeighbor) && !checked) {
          //   GameBoard.score++;
          //   existArr.push(foundNeighbor);
          //   console.log(existArr);
          //   console.log(GameBoard.score)
          //   checkWin(existArr, foundNeighbor);
          // } else {
          //   existArr = [];
          //   GameBoard.score = 0;
          // }1

        // }
    
    // })
  
function playRound() {
  let coords = getPosition();
  let chosen = findCell(coords);
  let existArr = [];
  GameBoard.score = 0;

  while (chosen.val !== 0) {
    console.log("Cell not empty. Choose another cell.")
    chosen = findCell(getPosition());
  } 

  updateCell(chosen);
  if (!checkWin(existArr, chosen)) { updateTurns() }

  console.log(GameBoard.board)
  }

  // let chosen = { cell: 0, pos: {row: 0, col: 0}, val: 0 }
  // while (chosen.val === 0) {
  //   chosen = findCell(getPosition());
  //   console.log(chosen);
  // }
  // let existArr = [];
  // updateCell(chosen); //update the value in that cell
  // checkWin(existArr, chosen);

  // matchCells(GameBoard.board, findAdjacent(chosen), chosen); //find all neighbor cells
  //basically chosen will be replaced once found match cells 


function playGame() {
  initialize(); //create players, draw board, assign turns
  while (GameBoard.score < 3) {
    playRound();
    if (GameBoard.score === 2) {
      console.log(`The winner is ${getCurrPlayer()}`);
      console.log(GameBoard.board)
      break;
    }
  }
  // playRound();
  // while (GameBoard.score < 3) {
  //   playRound(); //let the first player choose position
  //   if (GameBoard.score === 2) {
  //     console.log(`The winner is ${getCurrPlayer()}`);
  //     console.log(GameBoard.board)
  //     break;
  //   } else { updateTurns() }
  // }
}
// initialize();
// let test = { cell: 1, pos: { row: 0, col: 0 }, val: 0 }
// console.log(GameBoard.board)
// let check = isChecked(GameBoard.board, test)
// console.log(check)
playGame();