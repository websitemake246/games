let canvas = document.getElementById("snakeCanvas");
let ctx = canvas.getContext("2d");

let box = 20;
let snake = [];
let direction = "RIGHT";
let food;
let game;

function startSnakeGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    direction = "RIGHT";

    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    if (game) clearInterval(game);
    game = setInterval(drawSnake, 100);
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function snakeMove(dir) {
    if (dir === "UP" && direction !== "DOWN") direction = "UP";
    if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
    if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
}

function drawSnake() {
    ctx.clearRect(0, 0, 400, 400);

    snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? "#00ff88" : "#55ffbb";
        ctx.fillRect(part.x, part.y, box, box);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;
    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;

    if (headX === food.x && headY === food.y) {
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    if (headX < 0 || headX >= 400 || headY < 0 || headY >= 400) {
        clearInterval(game);
        alert("Game Over!");
    }

    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            clearInterval(game);
            alert("Game Over!");
        }
    }

    snake.unshift({ x: headX, y: headY });
}
