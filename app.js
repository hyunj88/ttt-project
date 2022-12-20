// REQUIREMENTS
// A user should be able to click on different squares to make a move.
// Every click will alternate between marking an X and O
// Upon marking of an individual cell, use JavaScript to add an X or O to the cell, according to whose turn it is.
// A cell should not be able to be replayed once marked.
// You should not be able to click remaining empty cells after the game is over.
// Add a reset button that will clear the contents of the board.
// Display a message to indicate which turn is about to be played.
// Detect draw conditions (ties/cat's game)
// Detect winner: Stop game and declare the winner if one player ends up getting three in a row.
// Hint: Determine a set of winning combinations. Check those combinations on the board contents after every move.

const cells = document.querySelectorAll('[data-cell]')
const message = document.querySelector('#message')
const restart = document.querySelector('#restart')
let turn = 'X'

// HTML attribute: step
// a number that specifies the granularity that the value must adhere to or the keyword any. It is valid for the numeric input types, including the date, month, week, time, datetime-local, number and range types.
const steps = {
    X: [],
    O: []
}

// cell patterns for win
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

cells.forEach(cell => {
    cell.addEventListener("click", () => move(cell) )
})

const move = (cell) => {
    // marking the cell with X or O based on turn
    cell.innerHTML = turn
    // making cell not clickable
    cell.style.pointerEvents = 'none' 

    // parseInt function converts its first argument to a string, parses that string, then returns an integer or NaN . If not NaN , the return value will be the integer that is the first argument taken as a number in the specified radix
    let cellBlock = parseInt(cell.getAttribute("data-cell"))
    if (turn === 'X') {
        steps.X.push(cellBlock)
    } else {
        steps.O.push(cellBlock)
    }

    // chang turns after making a move
    changeTurn()
}

const changeTurn = () => {
    let winner = verifyWin()

    if (winner) {
        stopGame(`Player ${winner} wins!`)
    } else if (!winner && steps.X.length + steps.O.length === 9) {
        stopGame('TIE!')
    } else {
        if (turn === 'X') {
            turn = 'O'
        } else {
            turn = 'X'
        }
        message.innerHTML = `${turn}'s turn`
    }
}

const stopGame = (msg) => {
    message.innerHTML = msg
    cells.forEach(cell => {
        cell.style.pointerEvents = 'none'
    })
}

const verifyWin = () => {
    let win = null
    let winner = null
    if (turn === 'X') {
        win = winConditions.some(winCondition => {
            return winCondition.every(condition => steps.X.includes(condition))
        })
        if (win) winner = 'X'
    } else if (turn === 'O') {
        win = winConditions.some(winCondition => {
            return winCondition.every(condition => steps.O.includes(condition))
        })
        if (win) winner = 'O'
    }

    return winner
}

// reset all variables
const restartGame = () => {
    steps.O = []
    steps.X = []
    turn = 'X'
    message.innerHTML = "X's turn"
    cells.forEach(cell => {
        cell.innerHTML = null
        cell.style.pointerEvents = 'auto'
    })
}

restart.addEventListener("click", restartGame)