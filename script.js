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

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  const isFieldEmpty = (field) => board[field] == "";

  return { getBoard, setField, isFieldEmpty, resetBoard };
})();

const gameController = (() => {
  const playerOne = player("X");
  const computer = player("O");
  let currentPlayer = playerOne;
  let board = gameBoard.getBoard();
  const boardFields = document.querySelectorAll(".board-field");
  const isEmpty = (field) => field == "";
  let gameOver = false;
  const message = document.querySelector(".message");
  let winner = "";
  let winningRow = [];

  const getWinningRow = () => winningRow;

  const displayMessage = () => {
    if (!gameOver) {
      message.textContent = `${
        currentPlayer == playerOne ? "Your" : "Computer's"
      } turn`;
    } else if (!(winner == "")) {
      message.textContent = `${winner == "X" ? "You win" : "Computer wins"}`;
    } else {
      message.textContent = "It's a tie!";
    }
  };

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
        winner = board[row[0]];
        console.log(`${board[row[0]]} wins`);
        gameOver = true;
        winningRow = row;
        displayController.displayWinningRow();
      } else if (!gameOver && board.every((field) => !isEmpty(field))) {
        console.log("It's a tie");
        gameOver = true;
      }
    });
  };

  const changePlayer = () =>
    (currentPlayer = currentPlayer == playerOne ? computer : playerOne);

  const setCurrentPlayer = (newPlayer) => {
    currentPlayer = newPlayer;
  };

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
    checkWinner();
    displayMessage();
  };

  const playerMove = () => {
    displayMessage();

    boardFields.forEach((field) =>
      field.addEventListener("click", (event) => {
        if (gameBoard.isFieldEmpty(event.target.id) && !gameOver) {
          gameBoard.setField(currentPlayer.getSign(), event.target.id);
          changePlayer();
          checkWinner();
          if (!gameOver) setTimeout(computerMove, 500);
          checkWinner();
          displayMessage();
        }
      })
    );
  };

  const resetGame = () => {
    gameOver = false;
  };

  displayMessage();

  playerMove();

  return {
    getWinningRow,
    resetGame,
    displayMessage,
    setCurrentPlayer,
    playerOne,
  };
})();

const displayController = (() => {
  const board = gameBoard.getBoard();
  const boardFields = document.querySelectorAll(".board-field");
  const restartButton = document.querySelector(".restart-btn");

  const renderBoard = () => {
    for (let i = 0; i < board.length; i++) {
      boardFields[i].textContent = board[i];
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      boardFields[i].textContent = "";
      boardFields[i].style.color = "#555b6e";
    }
  };

  const displayWinningRow = () => {
    const winningRow = gameController.getWinningRow();
    winningRow.forEach((field) => {
      boardFields[field].style.color = "#e05454";
    });
  };

  restartButton.addEventListener("click", () => {
    gameBoard.resetBoard();
    gameController.resetGame();
    clearBoard();
    renderBoard();
    gameController.setCurrentPlayer(gameController.playerOne);
    gameController.displayMessage();
  });

  return { renderBoard, displayWinningRow, clearBoard };
})();
