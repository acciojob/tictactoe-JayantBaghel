document.addEventListener('DOMContentLoaded', () => {
    const playerInputSection = document.querySelector('.player-input');
    const gameSection = document.querySelector('.game');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');
    const submitButton = document.getElementById('submit');
    
    let currentPlayer = 'X';
    let player1Name = '';
    let player2Name = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    submitButton.addEventListener('click', () => {
        player1Name = document.getElementById('player1').value;
        player2Name = document.getElementById('player2').value;

        if (player1Name && player2Name) {
            playerInputSection.classList.remove('active');
            gameSection.classList.add('active');
            updateMessage(`${player1Name}, you're up!`);
        } else {
            alert('Please enter names for both players.');
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            const cellIndex = cell.id - 1;
            if (board[cellIndex] === '' && gameActive) {
                board[cellIndex] = currentPlayer;
                cell.textContent = currentPlayer;
                if (checkWin()) {
                    gameActive = false;
                    updateMessage(`${currentPlayer === 'X' ? player1Name : player2Name}, congratulations you won!`);
                } else if (board.every(cell => cell !== '')) {
                    updateMessage(`It's a draw!`);
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    updateMessage(`${currentPlayer === 'X' ? player1Name : player2Name}, you're up!`);
                }
            }
        });
    });

    function updateMessage(message) {
        messageDiv.textContent = message;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => board[index] === currentPlayer);
        });
    }
});
