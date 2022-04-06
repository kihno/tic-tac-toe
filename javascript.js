
const game = (() => {
    
    // Cache DOM
    const gameBoard = document.getElementById('gameBoard');
    const spaces = Array.from(gameBoard.children);
    const tiles = document.querySelectorAll('.tiles');
    const display = document.getElementById('display');
    const endScreen = document.getElementById('end');
    const playAgain = document.getElementById('playAgain')

    const board = spaces.map(el => {
        return el.id;
    });
    
   tiles.forEach(tile => {
        tile.addEventListener('click', playerMove)
   })
    
   let gameOver = false;

   function playerMove(e) {
        let playerToken = 'X'
        const tile = e.target

        placeMark(tile, playerToken)
        checkWin(playerToken)

        if (!gameOver) {
            machineMove().machineLogic()
        }
    }

    function placeMark(tile, currentToken) {
        tile.textContent = currentToken;
        board[tile.id] = currentToken;
        tile.disabled = true;
    }

    function disableTile() {
        tiles.forEach(tile => {
            tile.disabled = true;
        });
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
                endGame();
                display.textContent = `${currentToken} wins.`;
                disableTile();
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
            endGame()
            disableTile();
            display.textContent = 'Tie Game.';
        }
    }

    function endGame() {
        gameOver = true;
        // gameBoard.style.display = 'none';
        endScreen.style.display = 'grid';
        tiles.forEach(tile => {
            tile.style.color = '#666'
        })


        playAgain.addEventListener('click', () => {
            endScreen.style.display = 'none';
            // gameBoard.style.display = 'grid';
            resetBoard();
        })
    }

    function resetBoard() {
        tiles.forEach(tile => {
            tile.textContent = '';
            board[tile.id] = tile.id;
            tiles.forEach(tile => {
                tile.disabled = false;
            });
            gameOver = false;
        })
    }

    return {
        tiles,
        board,
        checkWin
    }

})();

const players = (name, token) => {

    function addPlayer() {
        let name = input;
        let token = radio;
    }

    return {
        name,
        token
    }
};

const start = (() => {
    const playButton = document.getElementById('play');
    const startScreen = document.getElementById('start');
    const gameBoard = document.getElementById('gameBoard');

    playButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameBoard.style.display = 'grid';
    })
})();

let newUser = players('Alan', 'X');

const machine = players('The Machine', 'O');

const machineMove = (() => {
    machineToken = machine.token;

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