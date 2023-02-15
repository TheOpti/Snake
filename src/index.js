import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

var WIDTH = 800;
var HEIGHT = 600;

var $canvas = document.getElementById('canvas');

$canvas.setAttribute('width', WIDTH);
$canvas.setAttribute('height', HEIGHT);

var ctx = $canvas.getContext('2d');

document.addEventListener('keydown', checkKey);

var snake = [];
var food = {};
var points = 0;

var direction = 'right';

function initializeGame() {
  createSnake();
  drawSnake(snake);
  generateFood();
  gameLoop();
}

function gameLoop() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  var frameLength = 150;
  var next = checkDirection();
  var newPos = snake.pop();
  newPos.x = next.X;
  newPos.y = next.Y;
  snake.unshift(newPos);
  drawSnake(snake);
  paintCell(food.x, food.y);
  checkCollision();
  setTimeout(gameLoop, frameLength);
}

function checkDirection() {
  if (direction === 'right') {
    return {
      X: snake[0].x + 1,
      Y: snake[0].y + 0,
    };
  } else if (direction === 'left') {
    return {
      X: snake[0].x - 1,
      Y: snake[0].y + 0,
    };
  } else if (direction === 'up') {
    return {
      X: snake[0].x + 0,
      Y: snake[0].y + 1,
    };
  } else if (direction === 'down') {
    return {
      X: snake[0].x + 0,
      Y: snake[0].y - 1,
    };
  } else {
    return {
      X: snake[0].x + 0,
      Y: snake[0].y + 0,
    };
  }
}

function checkKey(event) {
  if (event.keyCode === 38 && direction !== 'up') {
    direction = 'down';
  } else if (event.keyCode === 40 && direction !== 'down') {
    direction = 'up';
  } else if (event.keyCode === 37 && direction !== 'right') {
    direction = 'left';
  } else if (event.keyCode === 39 && direction !== 'left') {
    direction = 'right';
  }
}

function drawSnake(snake) {
  for (var i = 0; i < snake.length; i++) {
    var c = snake[i];
    paintCell(c.x, c.y);
  }
}

function generateFood() {
  food = {
    x: Math.round((Math.random() * (WIDTH - 10)) / 10),
    y: Math.round((Math.random() * (HEIGHT - 10)) / 10),
  };
  if (!checkIfFoodXYCorrect()) {
    generateFood();
  }
}

function clearFood() {
  ctx.fillStyle = 'white';
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(food.x * 10, food.y * 10, 10, 10);
}

function checkIfFoodXYCorrect() {
  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x === food.x && snake[i].y === food.y) {
      return false;
    }
  }
  return true;
}

function checkCollision() {
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;

  for (var i = 1; i < snake.length; ++i) {
    if (
      (snakeX === snake[i].x && snakeY === snake[i].y) ||
      snakeX < 0 ||
      snakeX > WIDTH / 10 ||
      snakeY < 0 ||
      snakeY > HEIGHT / 10
    ) {
      console.log('game over!');
    }
  }

  if (snakeX === food.x && snakeY === food.y) {
    snake.push({ x: food.x, y: food.y });
    clearFood();
    generateFood();
  }
}

function createSnake() {
  var length = 15;
  for (var i = length; i > 10; i--) {
    snake.push({ x: i, y: 5 });
  }
}

function paintCell(x, y) {
  ctx.fillStyle = 'blue';
  ctx.fillRect(x * 10, y * 10, 10, 10);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(x * 10, y * 10, 10, 10);
}

initializeGame();
