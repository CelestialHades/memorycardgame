// 1. Get DOM element
const gameBoard = document.getElementById('gameBoard');

// 2. Create card values (4 pairs)
const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// 3. Shuffle array function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 4. Initialize the game
function initGame() {
  // Shuffle cards
  const shuffledValues = shuffle([...cardValues]);
  
  // Create card elements
  shuffledValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');j
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

// 5. Function to flip a card
function flipCard() {
  if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return; // Ignore if 2 cards are flipped, or card is already flipped/matched
  }
  
  this.classList.add('flipped');
  this.textContent = this.dataset.value;
  flippedCards.push(this);
  
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// 6. Function to check for a match
function checkMatch() {
  const [card1, card2] = flippedCards;
  
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    flippedCards = [];
    
    if (matchedPairs === cardValues.length / 2) {
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 1000); // Flip back after 1 second
  }
}

// 7. Start the game
initGame();