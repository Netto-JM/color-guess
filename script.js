const colorPaletteEl = document.getElementById('color-palette');
const colorBallsEl = document.getElementsByClassName('ball');
const answerTextEl = document.getElementById('answer');
const colorToGuessEl = document.getElementById('rgb-color');
const resetGameButtonEl = document.getElementById('reset-game');
const resetScoreButtonEl = document.getElementById('reset-score');
const scoreEl = document.getElementById('score');
const generateBallsButtonEl = document.getElementById('generate-balls');
const numberOfBallsEl = document.getElementById('number-of-balls');

function generateRandomColor() {
  const colorValues = [];
  for (let index = 0; index < 3; index += 1) {
    const colorValue = Math.floor(Math.random() * 256);
    colorValues[index] = colorValue;
  }
  const color = `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
  return color;
}

function decideGuessingColor(randomColors) {
  const ballsCount = randomColors.length;
  const colorIndex = Math.floor(Math.random() * ballsCount);
  const guessingColor = randomColors[colorIndex];
  return guessingColor;
}

function addRandomColors() {
  const randomColors = [];
  for (let index = 0; index < colorBallsEl.length; index += 1) {
    const ball = colorBallsEl[index];
    const randomColor = generateRandomColor();
    ball.style.backgroundColor = randomColor;
    randomColors.push(randomColor);
  }
  colorToGuessEl.textContent = decideGuessingColor(randomColors);
}

function updateScore(veredict) {
  const previousScore = Number(scoreEl.textContent);
  scoreEl.textContent = veredict === 'Acertou!' ? previousScore + 3 : previousScore - 1;
  addRandomColors();
}

function checkAnswer(event) {
  const clickedElement = event.target.closest('.ball');
  const clickedWhiteSpace = !clickedElement;
  if (clickedWhiteSpace) return;
  const clickedColor = clickedElement.style.backgroundColor;
  const colorToGuess = colorToGuessEl.textContent;
  const isCorrectAnswer = clickedColor === colorToGuess;
  const veredict = isCorrectAnswer ? 'Acertou!' : 'Errou! Tente novamente!';
  answerTextEl.textContent = veredict;
  updateScore(veredict);
}

function resetGame() {
  addRandomColors();
  answerTextEl.textContent = 'Escolha uma cor';
}

function resetScore() {
  scoreEl.textContent = 0;
}

function removeBalls(quantity) {
  for (let index = 0; index < quantity; index += 1) {
    colorPaletteEl.removeChild(colorPaletteEl.firstElementChild);
  }
}

function addBalls(quantity) {
  console.log(quantity);
}

function generateBalls() {
  const requiredNumberOfBalls = Number(numberOfBallsEl.value);
  const previousNumberOfBalls = colorBallsEl.length;
  const difference = requiredNumberOfBalls - previousNumberOfBalls;
  if (difference === 0) return;
  if (difference < 0) {
    const quantityToRemove = Math.abs(difference);
    removeBalls(quantityToRemove);
  } else {
    addBalls(difference);
  }
  resetGame();
  resetScore();
}

document.addEventListener('DOMContentLoaded', addRandomColors);
resetGameButtonEl.addEventListener('click', resetGame);
resetScoreButtonEl.addEventListener('click', resetScore);
generateBallsButtonEl.addEventListener('click', generateBalls);
colorPaletteEl.addEventListener('click', checkAnswer);
