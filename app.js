(function(){
    let canvas;
    let context2d;
    let wallSize = 10;
    let snake = [];
    let dx = 0;
    let dy = 0;
    let pauseGame = true;
    let food = {x:0, y:0, color: "white"};
    let points = 0;

  

    function getRandomInt(max) {
        return Math.floor( Math.random() * max );

    }
    function drawRectRandomColor(x, y, width, height) {
        context2d.fillStyle = `rgb(${getRandomInt(255)},
            ${getRandomInt(255)}, ${getRandomInt(255)})`;
        
        context2d.fillRect(x, y, width, height)
    }

    function clearCanvas() {
        context2d.fillStyle = "black";
        context2d.fillRect(0,0, canvas.width, canvas.height);
    }

    function makeSnake(snakeLength) {
        for (let i =0; i < snakeLength; i++) {
            let x = canvas.width/2 + i * wallSize;
            let y = canvas.height/2;
            snake.push({x:x, y:y});
        }
    }

    function drawSnake() {
        snake.forEach(function(el) {
            context2d.strokeStyle = "red";
            context2d.lineWidth = 5;
            context2d.lineJoin = "bevel";
            context2d.strokeRect(el.x, el.y, wallSize, wallSize);
        })
    }

    function checkWallsCollision() {
        snake.forEach(function(el) {
            if(el.x > canvas.width || el.x < 0
                || el.y > canvas.height || el.y < 0) resetGame();
        });
    }

    function checkFoodCollision() {
        if( food.x == snake[0].x && food.y == snake[0].y) {
            snake.push(Object.assign({}, snake[snake.length-1]));
            randomFood();
            points++;
        }
    }
    function stopGame() {
        pauseGame = true;
    }

  

    function resetGame() {
        snake = [];
        makeSnake(5);
        randomFood();
        pauseGame = true;
        points = 0;
    }

    function moveSnake(dx, dy) {
        let headX = snake[0].x + dx;
        let headY = snake[0].y + dy;
        snake.unshift({x: headX, y: headY});
        snake.pop();
    }

    function keyDown(e) {
        if(pauseGame) pauseGame = false;
        switch(e.keyCode) {
            case 37: //left
            case 65: //a
                dy = 0;
                dx = -10;
                break;
            case 38: //up
            case 87: //w
                dy = -10;
                dx = 0;
                break;
            case 39: //right
            case 68: //d
                dy = 0;
                dx = 10;
                break;
            case 40: //down
            case 83: //s
                dy = 10;
                dx = 0;
                break;
        }
    }

    function buttonUp(event) {
        if(pauseGame) pauseGame = false;
        dy = -10;
        dx = 0;
    }

    function buttonLeft(event) {
        if(pauseGame) pauseGame = false;
        dy = 0;
        dx = -10;
    }

    function buttonRight(event) {
        if(pauseGame) pauseGame = false;
        dy = 0;
        dx = 10;
    }

    function buttonDown(event) {
        if(pauseGame) pauseGame = false;
        dy = 10;
        dx = 0;
    }

    function randomFood(){
        function randV(min, max) {
            return Math.floor((Math.random() * (max-min) + min) / wallSize) * wallSize;
        }

        let colors = ["yellow", "silver", "white", "blue"];
        food.color = colors[Math.floor(Math.random()*colors.length)];

        food.x = randV(20, canvas.width -20);
        food.y = randV(20, canvas.height -20);
    }

    function drawFood() {
        context2d.fillStyle = food.color;
        context2d.fillRect(food.x, food.y, wallSize, wallSize);
    }

    function drawPoints() {
        context2d.font = "14px Arial";
        context2d.fillStyle = "white";
        context2d.fillText("Points:" + points, 10, 20);
    }

    function congratulation() {
        context2d.font = "30px Arial";
        context2d.fillStyle = "white";
        if(points == 2) {
            context2d.fillText("Nice!", 170, 350);
        }
        if(points == 5) {
            context2d.fillText("Good!", 170, 350);
        }
        if(points == 15) {
            context2d.fillText("Master!", 170, 350);
        }
        if(points == 20) {
            context2d.fillText("You rock!", 170, 350);
        }
        if(points == 30) {
            context2d.fillText("Amazing", 170, 350);
        }
    }


    
    function startApp() {
        canvas = document.getElementById("canvas");
        context2d = canvas.getContext("2d");
        document.addEventListener("keydown", keyDown);
        document.getElementById("up").addEventListener("click", buttonUp);
        document.getElementById("left").addEventListener("click", buttonLeft);
        document.getElementById("right").addEventListener("click", buttonRight);
        document.getElementById("down").addEventListener("click", buttonDown);
        document.getElementById("stopGame").addEventListener("click", stopGame);
        
     
        

        resetGame();

        setInterval(function() {
            clearCanvas();
            checkWallsCollision();
            checkFoodCollision();
            if(!pauseGame) moveSnake(dx, dy);
            drawPoints();
            drawFood();
            drawSnake();
            congratulation();

        }, 100);
    }

    window.onload = startApp;
})();