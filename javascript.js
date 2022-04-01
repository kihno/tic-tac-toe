
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
            }
        });
    }

    return {
        playerMove,
    }

})();