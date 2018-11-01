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
  console.log('init');
  buildCards();
  clearInterval(timerId);
  document.getElementsByClassName('board')[0].addEventListener('click', onClick);
  document.getElementsByClassName('restart-btn')[0].addEventListener('click', onRestart);
}

function buildCards() {
  console.log('build');
  shuffle();
  let count = 0;
  for (let i = 0; i < 4; i++) {
    const cardRow = document.querySelector(`#card-row-${i}`);
    for (let card of cardRow.children) {
      card.dataset.face = board[parseInt(count / 4)][count % 4];
      card.classList.remove('open');
      card.classList.remove('match');
      card.textContent = "";
      card.style.backgroundColor = "midnightblue";
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
  timerId = -1;

  clearInterval(timerId);
  buildCards();
}

function shuffle() {
  console.log('shuffle');
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

function onTimer() {
  document.getElementsByClassName('timer')[0].textContent = `${++timer} seconds`;
}

function updateMoves() {
  document.getElementsByClassName('moves')[0].textContent = `${++moves} moves`;
}

function isCardOpened() {
  return false;
}

function openCard(e) {
  console.log('openCard');
  e.target.classList.add('open');
  openCount++;
  openCardId = e.target.id;
  currentCard = e.target.dataset.face;
  e.target.textContent = currentCard;
  e.target.style.backgroundColor = "#aa0000";
}

function matchCard(e) {
  console.log('matchCard');
  let card = document.getElementById(openCardId);
  if (e.target.dataset.face == currentCard) {
    e.target.classList.add('match');
    e.target.classList.add('open');
    e.target.textContent = currentCard;
    e.target.style.backgroundColor = "#aa0000";
    card.classList.add('match');
    matchCount++;
    finish(matchCount);
    openCount = 0;
    openCardId = "";
  } else {
    // current card
    currCard = e.target;
    e.target.textContent = e.target.dataset.face;
    e.target.style.backgroundColor = "#aa0000";
    setTimeout(function() {
      currCard.textContent = "";
      currCard.style.backgroundColor = "midnightblue";
      // previous card
      let card = document.getElementById(openCardId)
      card.classList.remove('open');
      card.textContent = "";
      card.style.backgroundColor = "midnightblue";
      openCount = 0;
      openCardId = "";
    }, 500);
  }
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

function rating() {

}

function finish(count) {
  if (count == MATCH_CARD) {
    clearInterval(timerId);
    numOfWins++;
    showPopup();
    finished = true;
  }
}

function onClick(e) {
  console.log('onclick');
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
    updateMoves();
  }
}

function onRestart() {
  reset();
}

initialize();