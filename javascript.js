const start = (() => {
    const playButton = document.getElementById('play');
    const startScreen = document.getElementById('start');
    const gameBoard = document.getElementById('gameBoard');

    playButton.addEventListener('click', () => {
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameBoard.style.display = 'grid';
        }, 200)
    })
})();

const game = (() => {
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
        let currentPlayer = playerOne
        const tile = e.target

        placeMark(tile, currentPlayer)
        checkWin(currentPlayer)

        if (!gameOver) {
            machineMove().machineLogic()
        }
    }

    function placeMark(tile, currentPlayer) {
        tile.textContent = currentPlayer.token;
        board[tile.id] = currentPlayer.token;
        tile.disabled = true;
    }

    function disableTile() {
        tiles.forEach(tile => {
            tile.disabled = true;
        });
    }

    function checkWin(currentPlayer) {
        if (board[0] === currentPlayer.token && board[1] === currentPlayer.token && board[2] === currentPlayer.token ||
            board[3] === currentPlayer.token && board[4] === currentPlayer.token && board[5] === currentPlayer.token ||
            board[6] === currentPlayer.token && board[7] === currentPlayer.token && board[8] === currentPlayer.token ||
            board[0] === currentPlayer.token && board[3] === currentPlayer.token && board[6] === currentPlayer.token ||
            board[1] === currentPlayer.token && board[4] === currentPlayer.token && board[7] === currentPlayer.token ||
            board[2] === currentPlayer.token && board[5] === currentPlayer.token && board[8] === currentPlayer.token ||
            board[0] === currentPlayer.token && board[4] === currentPlayer.token && board[8] === currentPlayer.token ||
            board[2] === currentPlayer.token && board[4] === currentPlayer.token && board[6] === currentPlayer.token) {
                endGame();
                display.textContent = `${currentPlayer.name} wins`;
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

        endScreen.style.display = 'grid';
        tiles.forEach(tile => {
            tile.style.color = '#666'
        })


        playAgain.addEventListener('click', () => {
            setTimeout(() => {
                endScreen.style.display = 'none';
                resetBoard();
            }, 200)
        })
    }

    function resetBoard() {
        tiles.forEach(tile => {
            display.textContent = '';
            tile.textContent = '';
            board[tile.id] = tile.id;
            tiles.forEach(tile => {
                tile.disabled = false;
                tile.style.color = '#000';
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

    return {
        name,
        token
    }
};

let playerOne = players('Alan', 'X');

function getToken() {
    if (playerOne.token === 'X') {
        return 'O'
    } else {
        return 'X'
    }
}

const machine = players('The Machine', getToken());

const machineMove = (() => {
    currentPlayer = machine;

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
            choice.textContent = machine.token;
            game.board[choice.id] = machine.token;
            choice.disabled = true;
            game.checkWin(machine)
        }
        
    }

    return {
        machineLogic,
    }
});