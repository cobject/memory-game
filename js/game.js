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
let stars = 0;
let currCard;

function initialize() {
  buildCards();
  rating();
  clearInterval(timerId);
  document.getElementsByClassName('board')[0].addEventListener('click', onClick);
  document.getElementsByClassName('restart-btn')[0].addEventListener('click', onRestart);
}

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
  rating();
  updateTime();
  updateMoves();
}

function shuffle() {
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
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

function updateTime() {
  document.getElementsByClassName('timer')[0].textContent = `${timer} seconds`;
}

function onTimer() {
  timer++;
  updateTime();
}

function updateMoves() {
  document.getElementsByClassName('moves')[0].textContent = `${moves} moves`;
}

function isCardOpened() {
  return false;
}

function openCard(e) {
  e.target.classList.add('open');
  openCount++;
  openCardId = e.target.id;
  currentCard = e.target.dataset.face;
  e.target.textContent = currentCard;
  e.target.style.backgroundColor = "#dc3545";
}

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
      setTimeout(()=> {
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

function isFinished() {
  return finished;
}

function showPopup() {
  const str = `Congraturations!, ${numOfWins} win(s). ${stars} rating`;
  if (confirm(str)) {
    reset();
  }
}

function addStar(parent, inverse) {
  const img = document.createElement('img');
  img.classList.add('star');
  img.src = inverse == true ? "img/baseline-star_border-24px.svg" : "img/baseline-star-24px.svg";
  parent.appendChild(img);
}

function clearRating() {
  const stars = document.getElementsByClassName('star');
  const size = stars.length;
  for(let i = size-1; i >= 0; i--) {
    stars[i].remove();
  }
}

function rating() {
  const rating = document.getElementsByClassName('rating')[0];
  let stars = 0;
  let inverse_stars = 0;

  if(moves >= 30) {
    stars = 3;
  } else if(moves >= 15) {
    stars = 2;
  } else if(moves == 0){
    stars = 0;
  } else {
    stars = 1;
  }
  inverse_stars = 3 - stars;

  clearRating();

  for(let i = 0; i < stars; i++) {
    addStar(rating);
  }
  for(let i = 0; i < inverse_stars; i++) {
    addStar(rating, true);
  }
}

function finish() {
  clearInterval(timerId);
  numOfWins++;
  rating();
  showPopup();
}

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

function onRestart() {
  reset();
}

initialize();