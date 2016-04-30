var gameOver = false;
var backgroundColor = "rgb(23, 23, 23)";
var numSquares = 6;
var colors = [];
var pickedColor;
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var correctAnswers = document.querySelector("#correct_times");
var incorrectAnswers = document.querySelector("#incorrect_times");

init();

function init() {
  setupModeButtons();
  setupSquares();
  resetButton.addEventListener("click", reset);
  reset();
}

// Mode button event listeners
function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("difficultySelected");
      modeButtons[1].classList.remove("difficultySelected");
      modeButtons[2].classList.remove("difficultySelected");
      this.classList.add("difficultySelected");
      if (this.textContent === "Easy") {
        numSquares = 3;
      } else if (this.textContent === "Medium") {
        numSquares = 6;
      } else {
        numSquares = 9;
      }
      reset();
    });
  }  
}

// Square event listeners
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    // add click listeners to squares
    squares[i].addEventListener("click", function() {
      // grab color of clicked square
      var clickedColor = this.style.background;
      // compare color to pickedColor
      if (clickedColor === pickedColor) {
        if (!gameOver) {
          changeColors(clickedColor);
          var num = parseInt(correctAnswers.innerText);
          correctAnswers.textContent = num + 1;
          messageDisplay.textContent = "Correct!";
          resetButton.textContent = "Play Again?";
          gameOver = true;
        }
      } else {
        if (this.style.background != backgroundColor) {
          this.style.background = backgroundColor;
          var num = parseInt(incorrectAnswers.innerText);
          incorrectAnswers.textContent = num + 1;
          messageDisplay.textContent = "Try Again";
        }
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.background = "steelblue";
  gameOver = false;
}

function changeColors(color) {
  // loop through all squares
  for (var i = 0; i < squares.length; i++) {
    // change each color to match given color
    squares[i].style.background = color;
  }
  h1.style.background = color;
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);

  return colors[random];
}

function generateRandomColors(num) {
  // Make an array
  var arr = [];

  // repeat num times
  for (var i = 0; i < num; i++) {
    // get random color and push into arr
    arr.push(randomColor());
  } 

  // Return an array
  return arr;
}

function randomColor() {
  //pick a "red" from 0-255
  var red = Math.floor(Math.random() * 256);
  //pick a "green" from 0-255
  var green = Math.floor(Math.random() * 256);
  //pick a "blue" from 0-255
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}