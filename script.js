const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const restartBtn = document.getElementById('restart-btn');

let cards = [];
let flippedCards = [];
let moves = 0;
let time = 0;
let timer;
let symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍍', '🥝'];

function initializeGame() {
    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    flippedCards = [];
    moves = 0;
    time = 0;
    movesElement.textContent = moves;
    timeElement.textContent = time;
    gameBoard.innerHTML = '';
    clearInterval(timer);

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    timer = setInterval(() => {
        time++;
        timeElement.textContent = time;
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = cards[this.dataset.index];
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesElement.textContent = moves;
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
        flippedCards = [];
    } else {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '';
        });
        flippedCards = [];
    }

    if (document.querySelectorAll('.flipped').length === cards.length) {
        clearInterval(timer);
        alert(`Congratulations! You won in ${moves} moves and ${time} seconds.`);
    }
}

restartBtn.addEventListener('click', initializeGame);

initializeGame();