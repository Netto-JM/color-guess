// localStorage related code in comments

const colorBalls = document.getElementsByClassName('ball');

function generateRandomColor() {
  const colorValues = [];
  for (let index = 0; index < 3; index += 1) {
    const colorValue = Math.floor(Math.random() * 256);
    colorValues[index] = colorValue;
  }
  const color = `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`;
  return color;
}

function addRandomColors() {
  // const randomColors = [];
  for (let index = 0; index < colorBalls.length; index += 1) {
    const ball = colorBalls[index];
    const randomColor = generateRandomColor();
    ball.style.backgroundColor = randomColor;
    // randomColors.push(randomColor);
  }
  // localStorage.setItem('colorPalette', JSON.stringify(randomColors));
}

document.addEventListener('DOMContentLoaded', addRandomColors);
