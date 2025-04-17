document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    let currentPlayer = "X";
    let cells = Array(9).fill(null);
    let gameActive = true; // Add a flag to track if the game is active

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                status.textContent = `${cells[a]} Wins!`;
                gameActive = false; // Disable further moves
                return true;
            }
        }
        
        if (!cells.includes(null)) {
            status.textContent = "It's a Draw!";
            gameActive = false; // Disable further moves
            return true;
        }

        return false;
    }

    function handleClick(e) {
        const index = e.target.dataset.index;
        if (!cells[index] && gameActive) { // Ensure moves are only allowed when the game is active
            cells[index] = currentPlayer;
            e.target.textContent = currentPlayer;
            e.target.classList.add("taken");
            if (!checkWinner()) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function resetGame() {
        cells.fill(null);
        currentPlayer = "X";
        gameActive = true; // Reactivate the game
        status.textContent = "Player X's turn";
        board.innerHTML = "";
        createBoard();
    }

    function createBoard() {
        cells.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = index;
            cell.addEventListener("click", handleClick);
            board.appendChild(cell);
        });
    }

    createBoard();
    status.textContent = "Player X's turn";
    window.resetGame = resetGame;
});
