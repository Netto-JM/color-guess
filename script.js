const colorBallsEl = document.getElementsByClassName('ball');
const answerTextEl = document.getElementById('answer');
const colorToGuessEl = document.getElementById('rgb-color');
const resetGameButtonEl = document.getElementById('reset-game');
const resetScoreButtonEl = document.getElementById('reset-score');
const scoreEl = document.getElementById('score');

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

function checkAnswer(clickedElement) {
  const clickedColor = clickedElement.style.backgroundColor;
  const colorToGuess = colorToGuessEl.textContent;
  const isCorrectAnswer = clickedColor === colorToGuess;
  const veredict = isCorrectAnswer ? 'Acertou!' : 'Errou! Tente novamente!';
  answerTextEl.textContent = veredict;
  updateScore(veredict);
}

function clickHandler(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('ball')) {
    checkAnswer(clickedElement);
  }
}

function resetGame() {
  addRandomColors();
  answerTextEl.textContent = 'Escolha uma cor';
}

document.addEventListener('DOMContentLoaded', addRandomColors);
document.addEventListener('click', clickHandler);
resetGameButtonEl.addEventListener('click', resetGame);
resetScoreButtonEl.addEventListener('click', () => { scoreEl.textContent = 0; });
