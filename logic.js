//Gameboard represents the state of the gameboard
//Each square holds a Cell
//expose a method for dropping a token

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

  //now that we have the board
  //how do we find all the available cells?
  //available cells: all the cells that are empty aka cell.value = 0;
  const getValidCells = () => {
    const validCells = board.filter((row) => row.filter((cell) => cell.getValue() === 0));
    console.log(validCells);
    return validCells;
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
  const addToken = (player, row, col) => {
    value = player;
  }

  //method to get the current method
  const getValue = () => value;

  return { 
    addToken,
    getValue,
  }
}

function GameController() {
  //turn 0 = first player
  //turn 1 = second player
  //it's counterintuiive due to how array works
  const turn = 1;

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

  const getActivePlayer = (turn) => players[turn-1];
  const switchActivePlayer = (player) => player.token === 1 ? players[1] : players[0];

  //initialize the board
  const board = Gameboard();

  //print out the board so we can see
  const printBoard = () => {
    const boardWithCellValues = board.getBoard().map((row) => row.map((cell) => cell.getValue()))
    console.log(boardWithCellValues);
    };

  const playRound = () => {
    //get current active player turn = 1
    const activePlayer = getActivePlayer(1);
    //get all the valid cells so the player can make a move
    const availCells = board.getValidCells();
    //get player position
    const position = [0, 0];
    const isValid = (position, availCells) => availCells.includes()

    //you can do this
    //you can figure this out and you can complete this project
    //keep pushing
    console.log(activePlayer);
    console.log(availCells);

  }

  return { printBoard, getActivePlayer, switchActivePlayer, playRound }
}

let game = GameController();
game.playRound();
//now that 

// const testBoard = Gameboard();
// console.log(testBoard.printValidCells())
//for game controller
//initialize meaning draw the board
//find empty cells
//let player 1 pick the cell
//drop the token aka change value from 0 to 1
//check win condition in between
//switch turns


