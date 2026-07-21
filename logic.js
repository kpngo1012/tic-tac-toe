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

  const getValidCells = () => {
    const arr = [];

    board.map((row) => row.map((cell) => { 
      if (cell.getValue() === 0) arr.push(cell)
    } ));
    return arr;
  }

  const checkHorizontal = (player) => {
    let winRow = board.filter(row => {
      if (row.every(cell => cell.getValue() !== 0 && 
          cell.getValue() === row[0].getValue())) {
          return row;
      }})

    return winRow; //return that row?
   }

  const checkVertical = (player, userInput) => {
    let winCol = false;
    let row = userInput.getRow();
    let col = userInput.getCol();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if ((board[i][j].getValue()) !== 0 &&
           (board[0][j].getValue() === board[1][j].getValue() && 
            board[1][j].getValue() === board[2][j].getValue())) {
            winCol = true;
            break
      }}
      if (winCol) break;
    }
    return winCol;
  }

  const checkDiag = (player) => {
    let winDiag;

    //basically check (from left to right)
    //top left to bottom right diagonal
    //bototm left to top right diagonal
    //take the center and just run a manual equality check with the respective position
    //is there a better way to do this?????
    //YOU GOT THIS KEEP GOING YOURE NOT LETTING A TIC TAC TOE GAME BEAT YOUR ASS
    //YOU GOT THISS RAHHHHHHHHHHHHHH
    //YOU CAN SOLVE THIS SHITTTT
    //this is so convulated i wanna die 
    //at least this works
    //now what? package all the win conditions into one factory function?
    //find out how to access play token so we can announce who wins 
    //also end the game when theres a win condition
    //you got this swallow everything that you're feeling right now 
    //keep working
    //hang on to this damn code like your life depends on it
    //dont bother people go cry it out 

    let i = 1; //basically center indices of a 3x3 2d array
    let j = 1; //making things simple lol

  
      if (board[i][j].getValue() !== 0) {
        if (board[i][j].getValue() === board[i-1][j-1].getValue() &&
            board[i][j].getValue() === board[i+1][j+1].getValue()) {
              return "downDiag";
        } else if 
           (board[i][j].getValue() === board[i+1][j-1].getValue() &&
            board[i][j].getValue() === board[i-1][j+1].getValue()) {
              return "upDiag";
        }
      }
    
    return winDiag;
  }

  //method of getting the gameboard 
  const getBoard = () => board;
  return { getBoard, getValidCells, checkHorizontal, checkVertical, checkDiag };
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

function getInput() {
  let row, col;

  //get user input, only needed for console ver.
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

  //if user enters invalid input, keep going
  do {
    row = prompt("Choose a row (0-2): ", 0 );
  } while (!(isValid(row)));

  do {
    col = prompt("Choose a col (0-2): ", 0 );
  } while (!(isValid(col)));

  const getRow = () => parseInt(row);
  const getCol = () => parseInt(col);

  return { getRow, getCol }
}

function playRound(turn, board) {

  const currPlayers = Players();
  const activePlayer = currPlayers.getActivePlayer(turn);

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
    // console.log(`Before add token: ${cell.getValue()}`)
    // console.log(`Current player: ${player.name}`)
    if (checkEmpty(cell)) cell.addToken(player);
    // console.log(`After drop token: ${cell.getValue()}`);
  }

  const userInput = getInput();
  console.log(userInput.getRow(), userInput.getCol())
  const foundCell = searchCell(userInput.getRow(), userInput.getCol());
  makeMove(foundCell, activePlayer);
  let testRow = board.checkHorizontal(activePlayer).flat(); //flat() to make sure its not array within array
  let testCol = board.checkVertical(activePlayer, userInput); //check vertical win returns true or false
  let testDiag = board.checkDiag(activePlayer);
  console.log(testDiag)
  testRow.map(cell => console.log(cell.getValue()))
}

function GameController() {
  const switchTurn = turn => (turn === 1) ? 2 : 1;

  //initialize the board
  const board = Gameboard();

  //print out the board so we can see 
  const printBoard = () => {
    const boardWithCellValues = 
    board.getBoard().map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
  };

  let availCells = board.getValidCells();
  let turn = 1;

  while (availCells.length > 0) {
    playRound(turn, board);
    printBoard();
    turn = switchTurn(turn);
    availCells = board.getValidCells();
  }

  return { printBoard, playRound }
}

let game = GameController();


