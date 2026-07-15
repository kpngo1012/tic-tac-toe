//Gameboard represents the state of the gameboard
//Each square holds a Cell
//expose a method for dropping a token
const prompt = require("prompt-sync")({sigint: true}); 

function Gameboard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  //create a 2d array for the gameboard
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  // const getValidCells = () => {
  //   const validCells = board.filter((row) => row.filter((cell) => cell.getValue() === 0));
  //   return validCells;}

  const getValidCells = () => {
    const arr = [];

    board.map((row) => row.map((cell) => { 
      if (cell.getValue() === 0) arr.push(cell)
    } ));
    return arr;
  }


  //method of getting the gameboard 
  const getBoard = () => board;
  return { getBoard, getValidCells };
}

//A cell represents a square on the board and can have one of
//0 - no token is in the square
//1 - player one's token
//2 - player two's token

function Cell() {
  let value = 0;

  //accept a player's token to change the token of the cell
  const addToken = (player) => {
    value = player.token;
  }

  //method to get the current method
  const getValue = () => value;

  return { 
    addToken,
    getValue,
  }
}

function Players() {
  const players = [
    {
      name: "player 1",
      token: 1,
    },
    {
      name: "player 2",
      token: 2,
    }
  ];

  //get current active player
  const getActivePlayer = (turn) => players[turn-1];

  //switch turns - take the current turn and output the next one
  const switchActivePlayer = (player) => player.token === 1 ? players[1] : players[0];

  return { getActivePlayer, switchActivePlayer }
}

function playRound(turn, board) {

  const currPlayers = Players();
  const activePlayer = currPlayers.getActivePlayer(turn);

  const isValid = (input) => {
    if 
    (input && 
     input.length === 1 && 
     (parseInt(input) >= 0 && parseInt(input) <= 2)) 
     
     { return true }
    else {
      console.log(`Invalid input. Try again.`)
      return false;
  }}

  let getRow, getCol;

  const searchCell = (row, col) => {
    const gameboard = board.getBoard();

    for (let i = 0; i < 3; i++) {
      if (i === row) {
        for (let j = 0; j < 3; j++) {
          if (j === col) {
            console.log(`Player position: ${row}, ${col}`);
            console.log(`Gameboard cell: ${i}, ${j}`);
            return gameboard[i][j];
    }}}}
  }

  //change this variable name later to not be confused with checking valid userInput
  const checkEmpty = (cell) => cell.getValue() === 0 ? true : false;
  const makeMove = (cell, player) => {
    console.log(`Before add token: ${cell.getValue()}`)
    console.log(`Current player: ${player.name}`)
    if (checkEmpty(cell)) cell.addToken(player);
    console.log(`After drop token: ${cell.getValue()}`);
  }

  do {
    getRow = prompt("Choose a row (0-2): ", 0 );
  } while (!(isValid(getRow)));

  do {
    getCol = prompt("Choose a col (0-2): ", 0 );
  } while (!(isValid(getCol)));

  // console.log(getRow);
  // console.log(getCol);
  // console.log(activePlayer);
  // const foundCell = searchCell(parseInt(getRow), parseInt(getCol));
  // makeMove(foundCell, activePlayer);
}

function GameController() {
  const switchTurn = turn => (turn === 1) ? 2 : 1;

  //initialize the board
  const board = Gameboard();

  //print out the board so we can see 
  const printBoard = () => {
    const boardWithCellValues = board.getBoard().map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
    };


  let availCells = board.getValidCells();
  let turn = 1;

  // while (availCells.length > 0) {
  //   console.log(`Turn ${turn}`)
  //   playRound(turn, board);
  //   printBoard();
  //   turn = switchTurn(turn);
  //   availCells = board.getValidCells();
  // }
  playRound(turn, board)
  return { printBoard, playRound }
}

let game = GameController();


