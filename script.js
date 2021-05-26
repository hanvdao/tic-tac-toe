const player = () => {
  const sign = "X";

  const getSign = () => sign;

  const boardFields = document.querySelectorAll(".board-field");
  boardFields.forEach((field) =>
    field.addEventListener("click", (event) =>
      gameBoard.setField(sign, event.target.id)
    )
  );

  return { getSign };
};

const gameBoard = ((player) => {
  const boardDiv = document.querySelector(".board");

  let board = ["", "", "", "", "", "", "", "", ""];

  const setField = (sign, fieldID) => {
    board[Number(fieldID)] = sign;
    render();
  };

  const render = () => {
    const boardFields = document.querySelectorAll(".board-field");
    for (let i = 0; i < board.length; i++) {
      boardFields[i].textContent = board[i];
    }
  };

  return { board, render, setField };
})();

gameBoard.render();

const playerOne = player();
gameBoard.render();
const displayController = (() => {})();
