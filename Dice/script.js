'use strict';

// Dice inspired from https://codepen.io/bali_balo/pen/OepEvJ/fad66d54fc93ded651b912e838527428

// Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.cube');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, target;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  target = parseInt(prompt("Enter target score: "));
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

var min = 1;
var max = 24;

btnRoll.addEventListener('click', function () {
  if (playing) {
    playing = false;

    // Generate a random dice value
    var xRand = getRandom(max, min);
    var yRand = getRandom(max, min);
    
    diceEl.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    diceEl.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    const dice = getResult(xRand, yRand);

    // Check for rolled value
    if (dice !== 1) {
      // Delay for animation
      setTimeout(() => {  currentScore += dice;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore; playing = true; }, 1000);
    } else {
      setTimeout(() => { switchPlayer(); playing = true; }, 1000);
    }
  }
});

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

function mod(n, m) {
	return ((n % m) + m) % m;
}

function getResult(rotX, rotY) {
	let countX = mod(rotX / 90, 4);
	if (countX === 1) {
		return 6;
	}
	if (countX === 3) {
		return 5;
	}
	let countY = mod(rotY / 90 + countX, 4);
	return [1, 4, 2, 3][countY];
}

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= target) {
      // Finish the game
      playing = false;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        startConfetti();
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
