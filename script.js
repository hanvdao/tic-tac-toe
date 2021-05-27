const player = (sign) => {
  const getSign = () => sign;

  return { getSign };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setField = (sign, fieldID) => {
    board[Number(fieldID)] = sign;
    displayController.renderBoard();
  };

  const isFieldEmpty = (field) => board[field] == "";

  return { getBoard, setField, isFieldEmpty };
})();

const gameController = (() => {
  const playerOne = player("X");
  const computer = player("O");
  let currentPlayer = playerOne;
  const board = gameBoard.getBoard();
  const boardFields = document.querySelectorAll(".board-field");
  const isEmpty = (field) => field == "";
  let gameOver = false;

  const checkWinner = () => {
    const winningRows = [
      [0, 1, 2], //vertical
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], //horizontal
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], //diagonal
      [2, 4, 6],
    ];

    winningRows.forEach((row) => {
      if (
        board[row[0]] == board[row[1]] &&
        board[row[0]] == board[row[2]] &&
        !isEmpty(board[row[0]])
      ) {
        console.log(`${board[row[0]]} wins`);
        gameOver = true;
      } else if (board.every((field) => !isEmpty(field))) {
        console.log("It's a tie");
        gameOver = true;
      }
    });
  };

  const changePlayer = () =>
    (currentPlayer = currentPlayer == playerOne ? computer : playerOne);

  const computerMove = () => {
    function getAllIndexes(arr, val) {
      var indexes = [],
        i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
    }

    const emptyFields = getAllIndexes(board, "");
    const randomFieldIndex = Math.floor(Math.random() * emptyFields.length);
    const randomField = emptyFields[randomFieldIndex];
    gameBoard.setField(currentPlayer.getSign(), randomField);
    changePlayer();
  };

  const playerMove = () => {
    boardFields.forEach((field) =>
      field.addEventListener("click", (event) => {
        if (gameBoard.isFieldEmpty(event.target.id) && !gameOver) {
          gameBoard.setField(currentPlayer.getSign(), event.target.id);
          changePlayer();
          checkWinner();
          if (!gameOver) setTimeout(computerMove, 500);
        }
      })
    );
  };

  playerMove();

  return {};
})();

const displayController = (() => {
  const board = gameBoard.getBoard();

  const renderBoard = () => {
    const boardFields = document.querySelectorAll(".board-field");
    for (let i = 0; i < board.length; i++) {
      boardFields[i].textContent = board[i];
    }
  };

  return { renderBoard };
})();
