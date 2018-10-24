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

let openedCard;

function initialize() {

}

function reset() {

}

function shuffle() {

}

function onFlip(event) {

}

function onTimer() {

}

function updateMoves() {

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

}

function rating() {

}

function onClick(e) {
  console.log(flags[0][0]);
  if(e.target.id == "card-0-0") {
    if(flags[0][0] == 0) {
      e.target.innerHTML = cards[0][0];
      flags[0][0] = 1;
    } else if(flags[0][0] == 1)
      e.target.innerHTML = "";
      flags[0][0] = 0;
  }
}

const board = document.getElementsByClassName('board');
console.log(board);

board[0].addEventListener('click', onClick);