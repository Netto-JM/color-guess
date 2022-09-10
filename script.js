// localStorage related code in comments

const colorBallsEl = document.getElementsByClassName('ball');
const answerTextEl = document.getElementById('answer');
const colorToGuessEl = document.getElementById('rgb-color');

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
  colorToGuessEl.textContent = guessingColor;
}

function addRandomColors() {
  const randomColors = [];
  for (let index = 0; index < colorBallsEl.length; index += 1) {
    const ball = colorBallsEl[index];
    const randomColor = generateRandomColor();
    ball.style.backgroundColor = randomColor;
    randomColors.push(randomColor);
  }
  decideGuessingColor(randomColors);
  // localStorage.setItem('colorPalette', JSON.stringify(randomColors));
}

function checkAnswer(clickedElement) {
  const clickedColor = clickedElement.style.backgroundColor;
  const colorToGuess = colorToGuessEl.textContent;
  const isCorrectAnswer = clickedColor === colorToGuess;
  const veredict = isCorrectAnswer ? 'Acertou!' : 'Errou! Tente novamente!';
  answerTextEl.textContent = veredict;
}

function clickHandler(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains('ball')) {
    checkAnswer(clickedElement);
  }
}

document.addEventListener('DOMContentLoaded', addRandomColors);
document.addEventListener('click', clickHandler);
