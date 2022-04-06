
const game = (() => {
    
    // Cache DOM
    const gameBoard = document.getElementById('gameBoard');
    const spaces = Array.from(gameBoard.children);
    const tiles = document.querySelectorAll('.tiles');
    const display = document.getElementById('display');

    const board = spaces.map(el => {
        return el.id;
    });
    
   tiles.forEach(tile => {
        tile.addEventListener('click', playerMove, {once: true})
   })
    
   function playerMove(e) {
        let playerToken = 'X'
        const tile = e.target

        placeMark(tile, playerToken)
        checkWin(playerToken)

        machineMove().machineLogic()
    }

    function placeMark(tile, currentToken) {
        tile.textContent = currentToken;
        board[tile.id] = currentToken;
    }

    function checkWin(currentToken) {
        if (board[0] === currentToken && board[1] === currentToken && board[2] === currentToken ||
            board[3] === currentToken && board[4] === currentToken && board[5] === currentToken ||
            board[6] === currentToken && board[7] === currentToken && board[8] === currentToken ||
            board[0] === currentToken && board[3] === currentToken && board[6] === currentToken ||
            board[1] === currentToken && board[4] === currentToken && board[7] === currentToken ||
            board[2] === currentToken && board[5] === currentToken && board[8] === currentToken ||
            board[0] === currentToken && board[4] === currentToken && board[8] === currentToken ||
            board[2] === currentToken && board[4] === currentToken && board[6] === currentToken) {
                display.textContent = `${currentToken} wins.`;
                tiles.forEach(tile => {
                    tile.disabled = true;
                });
            } else {
                checkTie()
            }
    }

    function checkTie() {
        let emptySpaces = []

        tiles.forEach(tile => {
            if (tile.textContent === '') {
                emptySpaces.push(tile)
            }
        })

        if (emptySpaces.length === 0) {
            tiles.forEach(tile => {
                tile.disabled = true;
            });
            display.textContent = 'Tie Game.';
        }
    }

    return {
        tiles,
        board,
        checkWin
    }

})();

const player = (name, token) => {

    return {
        name,
        token
    }
};

let newUser = player('Alan', 'X');

const machine = player('The Machine', 'O');

const machineMove = (() => {
    machineToken = 'O';

    function getRandom() {
        let emptySpaces = []

        game.tiles.forEach(tile => {
            if (tile.textContent === '') {
                emptySpaces.push(tile)
            }
        })

        const random = emptySpaces[Math.floor(Math.random()*emptySpaces.length)]
        return random
    }

    function machineLogic() {
        choice = getRandom()

        if (choice === undefined) {
            return
        } else {
            choice.textContent = machineToken;
            game.board[choice.id] = machineToken;

            game.checkWin(machineToken)
        }
        
    }

    return {
        machineLogic,
    }
});