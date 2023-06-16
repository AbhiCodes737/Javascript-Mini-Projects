'use strict';

let genNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const message = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  
  // No input
  if (!guess) {
    message('⛔️ No number!');

  // Correct number guessed
  } else if (guess === genNumber) {
    message('🎉 Correct Guess, You Win!');
    document.querySelector('.number').textContent = genNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.guess').disabled = true;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

  // When guess is wrong
  } else if (guess !== genNumber) {
    if (score > 1) {
      message(guess > genNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.number').textContent = genNumber;
      document.querySelector('body').style.backgroundColor = '#f02c24';
      document.querySelector('.number').style.width = '30rem';
      document.querySelector('.guess').disabled = true;
      message('💀 You lost!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  genNumber = Math.trunc(Math.random() * 20) + 1;

  message('Start Guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').disabled = false;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
