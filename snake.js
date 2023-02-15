
var WIDTH = 400;
var HEIGHT = 300;

var $canvas = $('#canvas');

$canvas.attr('width', WIDTH);
$canvas.attr('height', HEIGHT);

var canvas = $canvas[0];
var ctx = canvas.getContext('2d');

document.onkeydown = checkKey;

var snake = [];
var food = {};
var points = 0;

direction = 'right';

function initializeGame() {
    drawBoard();
    createSnake();
    drawSnake(snake);
    generateFood();  
    gameLoop(); 
}    

function gameLoop() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    var frameLength = 100;
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
            Y: snake[0].y + 0
        };
    } else if (direction === 'left') {
        return {
            X: snake[0].x - 1,
            Y: snake[0].y + 0
        };
    } else if (direction === 'up') {
        return {
            X: snake[0].x + 0,
            Y: snake[0].y + 1
        };
    } else if (direction === 'down') {
        return {
            X: snake[0].x + 0,
            Y: snake[0].y - 1
        };
    } else {
        return {
            X: snake[0].x + 0,
            Y: snake[0].y + 0
        };
    }
}

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode === 38 && direction !== 'up') {
        direction = 'down';
    }
    else if (e.keyCode === 40 && direction !== 'down') {
        direction = 'up';
    }
    else if (e.keyCode === 37 && direction !== 'right') {
       direction = 'left';
    }
    else if (e.keyCode === 39 && direction !== 'left') {
       direction = 'right';
    }

}

function drawSnake(snake) {
    for (var i = 0; i< snake.length; i++) {
        var c = snake[i];
        paintCell(c.x, c.y);
    }
}

function generateFood() {
    food = {
        x: Math.round(Math.random() * (WIDTH - 10) / 10),
        y: Math.round(Math.random() * (HEIGHT - 10) / 10),
    };
    if (!checkIfFoodXYCorrect()) {
        generateFood();
    }
}

function clearFood() {
    ctx.fillStyle = "white";
    ctx.fillRect(food.x*10, food.y*10, 10, 10);
    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x*10, food.y*10, 10, 10);
}

function checkIfFoodXYCorrect() {
    for (var i = 0; i < snake.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            return false;
        };
    }
    return true;
}

function checkCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({x: food.x, y: food.y});
        clearFood();
        generateFood();
    }
}

function createSnake() {
    var length = 15;
    for (var i = length; i > 10 ; i--) {
        snake.push({x:i, y:5});
    }
    var i = 5;
};

function paintCell(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x*10, y*10, 10, 10);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*10, y*10, 10, 10);
}


function drawBoard() {
    ctx.fillStyle = '#fe57a1';
    $canvas.css("border", "1px solid #000000");
}


initializeGame();