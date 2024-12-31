const cardGrid = document.getElementById('card-grid');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let time = 0;
let timer;
let gameStarted = false;

// Generate cards data (pairs of numbers 1 to 8)
function generateCards() {
    const values = Array.from({ length: 8 }, (_, i) => i + 1);
    const cardValues = [...values, ...values]; // Duplicate for pairs
    shuffle(cardValues);

    cards = cardValues.map(value => ({
        value,
        flipped: false,
        matched: false
    }));
}

// Shuffle function for the card values
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Create the card elements and add to the grid
function createCards() {
    cardGrid.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);

        cardGrid.appendChild(cardElement);
    });
}

// Handle card flipping
function flipCard(event) {
    if (flippedCards.length === 2 || event.target.classList.contains('flipped')) return;

    const cardElement = event.target;
    const cardIndex = cardElement.dataset.index;
    const card = cards[cardIndex];

    if (gameStarted) {
        cardElement.classList.add('flipped');
        cardElement.textContent = card.value;
        flippedCards.push({ card, cardElement });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [first, second] = flippedCards;

    if (first.card.value === second.card.value) {
        first.card.matched = true;
        second.card.matched = true;
        score++;
        scoreElement.textContent = score;

        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            alert('You won! Your score is ' + score);
        }
    } else {
        setTimeout(() => {
            first.cardElement.classList.remove('flipped');
            second.cardElement.classList.remove('flipped');
            first.cardElement.textContent = '';
            second.cardElement.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

// Start the game
function startGame() {
    generateCards();
    createCards();
    score = 0;
    time = 0;
    matchedPairs = 0;
    scoreElement.textContent = score;
    timerElement.textContent = time;
    gameStarted = true;

    // Start timer
    timer = setInterval(() => {
        time++;
        timerElement.textContent = time;
    }, 1000);
}

// Restart the game
restartButton.addEventListener('click', () => {
    clearInterval(timer);
    gameStarted = false;
    startGame();
});

// Initialize the game
startGame();