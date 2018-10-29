const cards = [
    [1, 1, 2, 2],
    [3, 3, 4, 4],
    [5, 5, 6, 6],
    [7, 7, 8, 8]
];

/*
  0: closed
  1: open
  2: match
*/
const flags = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const MATCH_CARD = 8;

let openCount = 0;
let openCardId;
let currentCard;
let matchCount = 0;
let timer = 0;
let moves = 0;
let finished = false;
let timerId = -1;

function initialize() {
  clearInterval(timerId);
  const board = document.getElementsByClassName('board');
  board[0].addEventListener('click', onClick);
}

function reset() {
  openCount = 0;
  openCardId;
  currentCard;
  matchCount = 0;
  timer = 0;
  moves = 0;
  finished = false;
  timerId = -1;

  clearInterval(timerId);
  shuffle();
}

function shuffle() {

}

function onTimer() {
  timer++;
  document.getElementsByClassName('timer')[0].textContent = `${timer} seconds`;
}

function updateMoves() {
  moves++;
  document.getElementsByClassName('moves')[0].textContent = `${moves} moves`;
}

function isCardOpened() {
    return false;
}

function openCard(e) {
  e.target.classList.add('open');
  openCount++;
  openCardId = e.target.id;
  currentCard = e.target.innerHTML;
  e.target.style.backgroundColor = "#ffffff";
}

function matchCard(e) {
  let card = document.getElementById(openCardId);
  if(e.target.innerHTML == currentCard) {
    e.target.classList.add('match');
    e.target.classList.add('open');
    e.target.style.backgroundColor = "#ffffff";
    card.classList.add('match');
    matchCount++;
    finish(matchCount);
  } else {
    card.classList.remove('open');
    card.style.backgroundColor = "midnightblue";
  }
  openCount = 0;
  openCardId = "";
}

function isFinished() {
    return finished;
}

function showPopup() {
  if(confirm("Congraturations")) {
    initialize();
  }
}

function rating() {

}

function finish(count) {
  if(count == MATCH_CARD) {
    clearInterval(timerId);
    showPopup();
    finished = true;
  }
}

function onClick(e) {
  if(isFinished()) {
    return;
  }

  if(e.target.classList.contains('card')) {
    if(timerId == -1) {
     timerId = setInterval(onTimer, 1000);
    }

    if(!e.target.classList.contains('open')) {
      if(openCount > 0) {
        matchCard(e);
      } else {
        openCard(e);
      }
    } else {

    }
    updateMoves();
  }
}

initialize();