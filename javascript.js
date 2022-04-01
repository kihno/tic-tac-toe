
const gameBoard = (() => {

    let board = [];
    const tiles = document.querySelectorAll('.tiles');
    
    tiles.forEach(tile => {
        playerMove(tile);
    });

    function playerMove(tile) {
        tile.addEventListener('click', () => {
            if (tile.textContent === '') {
                tile.textContent = 'X';
                board.push('X');
                machineMove().machineLogic();
            }
        });
    }

    // function checkWinner() {
    //     if ()
    // }

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

    gameBoard.tiles.forEach(tile => {
        if (tile.textContent === '') {
            emptySpaces.push(tile)
        }
    })

    function random() {
        return emptySpaces[Math.floor(Math.random()*emptySpaces.length)];
    }

    function machineLogic() {
        if (emptySpaces.length === 0) {
            console.log('Tie Game');
        } else {
            random().textContent = 'O';
            gameBoard.board.push('O');
        }
    }

    return {
        machineLogic,
    }
});