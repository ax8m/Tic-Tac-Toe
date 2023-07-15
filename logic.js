let currentTurn = "X"
let gameIsFinished = false

let squares = document.getElementsByClassName("square")

let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
];

// // check if there any data in local host
if (localStorage.length == 0) {
    document.getElementById("alert").style.animation = "alert-appear 1.5s 2s forwards"
}
else {
    // player names
    document.getElementById("playerName-1").innerHTML = localStorage.getItem("player-1")
    document.getElementById("playerName-2").innerHTML = localStorage.getItem("player-2")

    // results
    document.getElementById("player1-result").innerHTML = localStorage.player1Result
    document.getElementById("player2-result").innerHTML = localStorage.player2Result

    theGame()

}

// ===== Enter players names ======
function enterNames() {
    localStorage.clear()
    let player1 = document.getElementById("player1").value
    let player2 = document.getElementById("player2").value

    // set items in local host 
    // set player name
    localStorage.setItem("player-1", player1 == "" ? "player 1" : player1)
    localStorage.setItem("player-2", player2 == "" ? "player 2" : player2)
    // set players results 
    localStorage.setItem("player1Result", 0)
    localStorage.setItem("player2Result", 0)

    document.getElementById("playerName-1").innerHTML = player1 == "" ? "player 1" : player1
    document.getElementById("playerName-2").innerHTML = player2 == "" ? "player 2" : player2

    document.getElementById("alert").style.animationFillMode = "backwards"

    theGame()

}
// ===== // Enter players names // ======

function theGame() {

    var playerName1 = localStorage.getItem('player-1')
    var playerName2 = localStorage.getItem('player-2')

    document.getElementById("player-turn").innerHTML = `${currentTurn == "X" ? playerName1 : playerName2} turn`

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
                document.getElementById("player-turn").innerHTML = `${localStorage.getItem('player-2')} Turn`
            } else {
                currentTurn = "X"
                document.getElementById("player-turn").innerHTML = `${localStorage.getItem('player-1')} Turn`
            }

            evaluateBoard()
        })
    }
}

function evaluateBoard() {
    // get players name of local host
    var playerName1 = localStorage.getItem('player-1')
    var playerName2 = localStorage.getItem('player-2')


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
        var winner = currentTurn == "O" ? playerName1 : playerName2

        if (currentTurn == "O") {
            localStorage.player1Result = Number(localStorage.player1Result) + 1
        } else {
            localStorage.player2Result = Number(localStorage.player2Result) + 1
        }
        gameIsFinished = true
        alert(`The game is over, ${winner} won!`)

        // show results in html code
        document.getElementById("player1-result").innerHTML = localStorage.player1Result
        document.getElementById("player2-result").innerHTML = localStorage.player2Result

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

function reset() {
    localStorage.clear()

    document.getElementById("alert").innerHTML = `
    <div>
    <div>
    <p>Enter Yours Names</p>
    </div>
    <div id="body-alert">
    <label for="">Player 1 : </label>
    <input type="text" name="name" id="player1" title="Write a name"><br><br>
    <label for="">Player 2 : </label>
    <input type="text" name="name" id="player2" title="Write a name">
    </div>
    <div>
    <button type="submit" onclick="enterNames()">OK</button>
    </div>
    </div>
    `
    document.getElementById("alert").style.animation = "alert-appear 1.5s 0.5s forwards"

    document.getElementById("player1-result").innerHTML = 0
    document.getElementById("player2-result").innerHTML = 0

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