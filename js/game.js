const board = [
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1],
  [-1, -1, -1, -1]
];

const cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

const MATCH_CARD = 8;

let openCount = 0;
let openCardId;
let currentCard;
let matchCount = 0;
let timer = 0;
let moves = 0;
let finished = false;
let timerId = -1;
let numOfWins = 0;
let rating = 0;
let currCard;

/**
* @description Initialize a game
*/
function initialize() {
  buildCards();
  setRating();
  clearInterval(timerId);
  document.getElementsByClassName('board')[0].addEventListener('click', onClick);
  document.getElementsByClassName('restart-btn')[0].addEventListener('click', onRestart);
}

/**
* @description Build cards
*/
function buildCards() {
  shuffle();
  let count = 0;
  for (let i = 0; i < 4; i++) {
    const cardRow = document.querySelector(`#card-row-${i}`);
    for (let card of cardRow.children) {
      card.dataset.face = board[parseInt(count / 4)][count % 4];
      card.classList.remove('open');
      card.classList.remove('match');
      card.textContent = "";
      card.style.backgroundColor = "#23272b";
      count++;
    }
  }
}

/**
* @description Reset a game
*/
function reset() {
  openCount = 0;
  openCardId = 0;
  currentCard = 0;;
  matchCount = 0;
  timer = 0;
  moves = 0;
  finished = false;

  clearInterval(timerId);
  timerId = -1;
  buildCards();
  setRating();
  updateTime();
  updateMoves();
}

/**
* @description Shuffle cards
*/
function shuffle() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board[i][j] = -1;
    }
  }

  for (let card of cards) {
    while (true) {
      let n = Math.floor((Math.random() * 16));
      [row, col] = [parseInt(n / 4), n % 4];
      if (board[row][col] == -1) {
        board[row][col] = card;
        break;
      }
    }
  }
}

/**
* @description Update time
*/
function updateTime() {
  document.getElementsByClassName('timer')[0].textContent = `${timer} seconds`;
}

/**
* @description Callback function for timer
*/
function onTimer() {
  timer++;
  updateTime();
}

/**
* @description Update moves
*/
function updateMoves() {
  document.getElementsByClassName('moves')[0].textContent = `${moves} moves`;
}

/**
* @description Open a card
* @param {event} click event for card
*/
function openCard(e) {
  e.target.classList.add('open');
  openCount++;
  openCardId = e.target.id;
  currentCard = e.target.dataset.face;
  e.target.textContent = currentCard;
  e.target.style.backgroundColor = "#dc3545";
}

/**
* @description Match a card
* @param {e} click event for card
*/
function matchCard(e) {
  let card = document.getElementById(openCardId);
  if (e.target.dataset.face == currentCard) {
    e.target.classList.add('match');
    e.target.classList.add('open');
    e.target.textContent = currentCard;
    e.target.style.backgroundColor = "#dc3545";
    card.classList.add('match');
    matchCount++;
    if (matchCount == MATCH_CARD) {
      finished = true;
      setTimeout(() => {
        finish();
      }, 100);
    }

    openCount = 0;
    openCardId = "";
  } else {
    // current card
    currCard = e.target;
    e.target.textContent = e.target.dataset.face;
    e.target.style.backgroundColor = "#dc3545";
    setTimeout(function() {
      currCard.textContent = "";
      currCard.style.backgroundColor = "#23272b";
      // previous card
      let card = document.getElementById(openCardId)
      card.classList.remove('open');
      card.textContent = "";
      card.style.backgroundColor = "#23272b";
      openCount = 0;
      openCardId = "";
    }, 500);
  }
  moves++;
  updateMoves();
}

/**
* @description Returns whether game is finished or not
*/
function isFinished() {
  return finished;
}

/**
* @description Show popup
*/
function showPopup() {
  const str = `Congraturations!, ${numOfWins} win(s). ${rating} rating`;
  if (confirm(str)) {
    reset();
  }
}

/**
* @description Add star in rating component
* @param {parent} parent node
* @param {inverse} whether inverse star or not
*/
function addStar(parent, inverse) {
  const img = document.createElement('img');
  img.classList.add('star');
  img.src = inverse == true ? "img/baseline-star_border-24px.svg" : "img/baseline-star-24px.svg";
  parent.appendChild(img);
}

/**
* @description Clear rating
*/
function clearRating() {
  const stars = document.getElementsByClassName('star');
  const size = stars.length;
  for (let i = size - 1; i >= 0; i--) {
    stars[i].remove();
  }
}

/**
* @description Set ratign
*/
function setRating() {
  const element = document.getElementsByClassName('rating')[0];
  rating = 0;
  let inverse_stars = 0;

  if (moves >= 30) {
    rating = 3;
  } else if (moves >= 15) {
    rating = 2;
  } else if (moves == 0) {
    rating = 0;
  } else {
    rating = 1;
  }
  inverse_stars = 3 - rating;

  clearRating();

  for (let i = 0; i < rating; i++) {
    addStar(element);
  }
  for (let i = 0; i < inverse_stars; i++) {
    addStar(element, true);
  }
}

/**
* @description Finish game
*/
function finish() {
  clearInterval(timerId);
  numOfWins++;
  setRating();
  showPopup();
}

/**
* @description Click callback for card
* @param {e} event for card
*/
function onClick(e) {
  if (isFinished()) {
    return;
  }

  if (e.target.classList.contains('card')) {
    if (timerId == -1) {
      timerId = setInterval(onTimer, 1000);
    }
    if (!e.target.classList.contains('open')) {
      if (openCount > 0) {
        matchCard(e);
      } else {
        openCard(e);
      }
    } else {

    }
  }
}

/**
* @description Click callback for button
*/
function onRestart() {
  reset();
}

initialize();