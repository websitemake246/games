let board;
let currentPlayer = "X";
let running = false;

function startTicTacToe() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;

    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    board.forEach((_, i) => {
        let cell = document.createElement("div");
        cell.addEventListener("click", () => playerMove(i));
        boardDiv.appendChild(cell);
    });

    document.getElementById("ticStatus").innerText = "Player X's turn";
}

function playerMove(i) {
    if (!running || board[i] !== "") return;

    board[i] = currentPlayer;
    document.getElementById("board").children[i].innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById("ticStatus").innerText = `${currentPlayer} Wins! 🎉`;
        running = false;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("ticStatus").innerText = "Draw!";
        running = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("ticStatus").innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return wins.some(pattern =>
        pattern.every(i => board[i] === currentPlayer)
    );
}

function resetTicTacToe() {
    startTicTacToe();
}
