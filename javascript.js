
const game = (() => {

    const gameBoard = document.getElementById('gameBoard');
    const spaces = Array.from(gameBoard.children);
    const tiles = document.querySelectorAll('.tiles');
    const display = document.getElementById('display');

    const board = spaces.map(el => {
        return el.id;
    });
    
    tiles.forEach(tile => {
        playerMove(tile);
    });

    function playerMove(tile) {
        tile.addEventListener('click', () => {
            if (tile.textContent === '') {
                tile.textContent = 'X';
                board[tile.id] = 'X';
                machineMove().machineLogic();
                checkWinner();
            }
        });
    }

    function checkWinner() {
        if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X' ||
            board[3] === 'X' && board[4] === 'X' && board[5] === 'X' ||
            board[6] === 'X' && board[7] === 'X' && board[8] === 'X' ||
            board[0] === 'X' && board[3] === 'X' && board[6] === 'X' ||
            board[1] === 'X' && board[4] === 'X' && board[7] === 'X' ||
            board[2] === 'X' && board[5] === 'X' && board[8] === 'X' ||
            board[0] === 'X' && board[4] === 'X' && board[8] === 'X' ||
            board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
            display.textContent = 'Player wins';
        }
    }

    return {
        tiles,
        board,
        playerMove,
    }

})();

const player = (name) => {

    return {
        name,
    }
};

const machine = player('The Machine');

const machineMove = (() => {

    const emptySpaces = [];

    game.tiles.forEach(tile => {
        if (tile.textContent === '') {
            emptySpaces.push(tile)
        }
    });

    const random = emptySpaces[Math.floor(Math.random()*emptySpaces.length)];
    
    function machineLogic() {
        if (emptySpaces.length === 0) {
            console.log('Tie Game');
        } else {
            random.textContent = 'O';
            game.board[random.id] = 'O';
        }
    }

    return {
        machineLogic,
    }
});