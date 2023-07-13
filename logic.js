// ===== Enter players names ======
// document.getElementById("alert").style.visibility = "visible"
function enterNames() {
    let player1 = document.getElementById("player1").value
    let player2 = document.getElementById("player2").value

    document.getElementById("playerName-1").innerHTML = player1 == "" ? "player 1" : player1
    document.getElementById("playerName-2").innerHTML = player2 == "" ? "player 2" : player2

    document.getElementById("alert").style.animationFillMode = "backwards"
}
// ===== // Enter players names // ======
let playerName1 = document.getElementById("playerName-1").innerHTML
let playerName2 = document.getElementById("playerName-2").innerHTML
console.log(playerName2)
document.getElementById("player-turn").innerHTML = playerName1
let currentTurn = "X"
let gameIsFinished = false

let squares = document.getElementsByClassName("square")

let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
];

for (const item of squares) {
    item.addEventListener("click", () => {
        if (gameIsFinished) {
            return
        }

        let value = item.getAttribute("value")
        let index = value - 1

        if (boardArray[index] == "X" || boardArray[index] == "O") {
            return
        }

        // add the (X - O) To square content
        let squareContent = document.querySelector(`.square[value='${value}'] .square-content`)
        squareContent.innerText = currentTurn

        // add the input to the representative logic
        boardArray[index] = currentTurn

        // change the turn 
        if (currentTurn == "X") {
            currentTurn = "O"
            document.getElementById("player-turn").innerHTML = `${playerName1} Turn`
        } else {
            currentTurn = "X"
            document.getElementById("player-turn").innerHTML = `${playerName2} Turn`
        }

        evaluateBoard()
    })
}

function evaluateBoard() {
    if (
        // rows
        (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||

        // cols
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||

        // Diagonal
        (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) ||
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])
    ) {
        var winner = currentTurn == "O" ? "X" : "O"
        gameIsFinished = true
        alert(`The game is over, ${winner} won!`)
        return
    }

    var isDraw = true
    for (const square of boardArray) {
        if (square != "X" && square != "O") {
            isDraw = false
            break
        }
    }
    if (isDraw) {
        gameIsFinished = true;
        alert("Game Is Draw")
    }
}

function alert(message) {

    let alertContent =
        `
        <div>
        <br>
            <div id="body-alert">
            ${message}
            </div>
            <div>
                <button type="submit" onclick="playAgain()">Play again</button>
            </div>
        </div>
    `

    document.getElementById("alert").innerHTML = alertContent
    document.getElementById("alert").style.visibility = "visible"
}

function playAgain() {
    document.getElementById("alert").style.visibility = "hidden"

    currentTurn = currentTurn == "O" ? "O" : "X"
    gameIsFinished = false

    squares = document.getElementsByClassName("square")

    boardArray = [
        "0", "1", "2",
        "3", "4", "5",
        "6", "7", "8"
    ];

    for (const item of squares) {
        // clean board
        let value = item.getAttribute("value")
        let squareContent = document.querySelector(`.square[value='${value}'] .square-content`)
        squareContent.innerText = ""
    }
}