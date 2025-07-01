const boardElement = document.getElementById("sudoku-board");
// Create 81 input boxes
for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");
    input.setAttribute("id", `cell-${i}`);
    boardElement.appendChild(input);
}
// Get the current board as a 2D array
function getBoard() {
    const board = [];
    for (let r = 0; r < 9; r++) {
        const row = [];
        for (let c = 0; c < 9; c++) {
            const val = document.getElementById(`cell-${r * 9 + c}`).value;
            row.push(val === "" ? 0 : parseInt(val));
        }
        board.push(row);
    }
    return board;
}
// Fill the board with solution
function setBoard(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            document.getElementById(`cell-${r * 9 + c}`).value = board[r][c] === 0 ? "" : board[r][c];
        }
    }
}
function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) return false;
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(x / 3);
        const boxCol = 3 * Math.floor(col / 3) + (x % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function solve() {
    const board = getBoard();
    const message = document.getElementById("message");
    if (solveSudoku(board)) {
        setBoard(board);
        message.textContent = "Solved!";
        message.style.color = "green";
    } else {
        message.textContent = "No solution found.";
        message.style.color = "red";
    }
}
function clearBoard() {
    for (let i = 0; i < 81; i++) {
        document.getElementById(`cell-${i}`).value = "";
    }
    document.getElementById("message").textContent = "";
}