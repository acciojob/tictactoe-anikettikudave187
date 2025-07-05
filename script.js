let startBtn = document.getElementById('submit');
let resetBtn = document.getElementById('reset');
let boxes = document.querySelectorAll('.cells');
let playersDiv = document.querySelector('.players');
let board = document.querySelector('.board');
let msg = document.getElementById('winner');

let player1 = "";
let player2 = "";
let turnX = true;
let count = 0;

const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Attach click handlers to boxes just once
boxes.forEach((box) => {
    box.addEventListener("click", () => handleMove(box));
});

startBtn.addEventListener("click", () => {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;

    if (!player1 || !player2) {
        alert("Please enter both player names.");
        return;
    }

    playersDiv.classList.add('hide');
    board.classList.remove('hide');
    msg.innerText = `${player1}, you're up`;
    msg.classList.remove('hide');
    resetGame();
});

resetBtn.addEventListener("click", resetGame);

function handleMove(box) {
    if (box.disabled) return;

    box.innerText = turnX ? "x" : "o";
    box.disabled = true;
    msg.innerText = turnX ? `${player2}, you're up` : `${player1}, you're up`;

    count++;
    if (isWinner()) return;
    if (count === 9) return gameDraw();

    turnX = !turnX;
}

function isWinner() {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            const winnerName = (val1 === "x") ? player1 : player2;
            showWinner(winnerName);
            return true;
        }
    }
    return false;
}

function showWinner(winnerName) {
    msg.innerText = `${winnerName} congratulations you won!`;
    disableBoxes();
    setTimeout(newGame, 2000);
}

function gameDraw() {
    msg.innerText = "Game is draw";
    disableBoxes();
    setTimeout(newGame, 2000);
}

function disableBoxes() {
    boxes.forEach(box => box.disabled = true);
}

function enableBoxes() {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

function resetGame() {
    turnX = true;
    count = 0;
    enableBoxes();
}

function newGame() {
    resetGame();
    playersDiv.classList.remove('hide');
    board.classList.add('hide');
    msg.classList.add('hide');
    document.getElementById('player1').value = "";
    document.getElementById('player2').value = "";
}
