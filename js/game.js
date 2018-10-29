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

let timerId;

function initialize() {

}

function reset() {

}

function shuffle() {

}

function onFlip(event) {

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

function matchCard() {
    return false;
}

function isFinish() {
    return false;
}

function showPopup() {
    alert("You win!");
}

function rating() {

}

function finish(count) {
  if(count == MATCH_CARD) {
    clearInterval(timerId);
    showPopup();
  }
}

function onClick(e) {
  if(matchCount >= MATCH_CARD) {
    return;
  }

  if(e.target.classList.contains('card')) {
    const classList = e.target.classList;
    if(!classList.contains('open')) {
      if(openCount > 0) {
        let card = document.getElementById(openCardId);
        if(e.target.innerHTML == currentCard) {
          e.target.classList.add('match');
          e.target.classList.add('open');
          card.classList.add('match');
          matchCount++;
          finish(matchCount);
          e.target.style.backgroundColor = "#ffffff";
        } else {
          card.classList.remove('open');
          card.style.backgroundColor = "midnightblue";
        }
        openCount = 0;
        openCardId = "";
      } else {
        classList.add('open');
        openCount++;
        openCardId = e.target.id;
        currentCard = e.target.innerHTML;
        e.target.style.backgroundColor = "#ffffff";
      }
    } else {

    }
    updateMoves();
  }
}

timerId = setInterval(onTimer, 1000);
const board = document.getElementsByClassName('board');
board[0].addEventListener('click', onClick);