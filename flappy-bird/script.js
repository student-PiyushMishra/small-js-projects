const audio = new Audio();
const game = () => {
    audio.src = "assets/game-start.mp3";
    audio.play();
    const bird = document.querySelector(".bird");
    let birdTopDistance = parseFloat(getComputedStyle(bird).top);
    const navHeight = window.innerHeight * 0.09;
    const gravity = 0.1;
    let speed = 1.8;
    const obstacleSpeed = 3;
    const obstacleSpacing = 4;
    let gameOver = false;


    const increaseHeight = () => {
        if (gameOver == true) { return; };
        audio.src = "assets/move.mp3";
        audio.play();
        speed = 1.8;
        birdTopDistance -= 100;
        bird.style.top = `${birdTopDistance}px`;
    }

    const gravityOnBall = () => {
        if (gameOver == true) { return; }
        speed = speed + gravity;
        birdTopDistance += speed;

        if (birdTopDistance + bird.offsetHeight >= window.innerHeight - navHeight) {
            birdTopDistance = window.innerHeight - navHeight - bird.offsetHeight;
        }
        if (birdTopDistance < 0) {
            birdTopDistance = 0;
        }

        bird.style.top = `${birdTopDistance}px`;
        if (Math.abs(speed) > 0) {
            requestAnimationFrame(gravityOnBall);
        }
    };
    const createObstacles = () => {
        if (gameOver == true) { return; }
        const obstacle = document.createElement("div");
        obstacle.classList.add("obstacle");
        const topPipe = document.createElement("div");
        topPipe.classList.add("top-pipe");
        const bottomPipe = document.createElement("div");
        bottomPipe.classList.add("bottom-pipe");
        const gapHeightArr = [170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];
        let gap = gapHeightArr[Math.floor(Math.random() * gapHeightArr.length)];
        const topPipeHeight = Math.random() * (window.innerHeight - gap);
        const bottomPipeHeight = window.innerHeight - topPipeHeight - gap;
        topPipe.style.height = `${topPipeHeight}px`;
        bottomPipe.style.height = `${bottomPipeHeight}px`;
        obstacle.appendChild(topPipe);
        obstacle.appendChild(bottomPipe);
        document.querySelector(".obstacles").appendChild(obstacle);
        moveObstacle(obstacle);
        setTimeout(() => {
            createObstacles();
        }, obstacleSpacing / obstacleSpeed * 1000);
        return obstacle;
    }

    const moveObstacle = (obstacle) => {
        if (gameOver == true) { return; }
        let obstacleLeft = window.innerWidth;

        const move = () => {
            obstacleLeft -= obstacleSpeed; // Move the obstacle leftward
            obstacle.style.left = `${obstacleLeft}px`;

            if (obstacleLeft + obstacle.offsetWidth < 0) {
                obstacle.remove();
            } else {
                requestAnimationFrame(move);
            }
        };

        move();
    };

    let score = 0;
    const checkCollisionOrIncreaseScore = () => {
        if (gameOver == true) { return; }
        const obstacles = document.querySelectorAll(".obstacle");
        const birdRect = bird.getBoundingClientRect();
        const score_btn = document.querySelector(".score button");

        obstacles.forEach(obstacle => {
            const topPipeRect = obstacle.querySelector('.top-pipe').getBoundingClientRect();
            const bottomPipeRect = obstacle.querySelector('.bottom-pipe').getBoundingClientRect();

            // Detect collision with top pipe
            if (
                birdRect.right > topPipeRect.left &&
                birdRect.left < topPipeRect.right &&
                birdRect.top < topPipeRect.bottom
            ) {
                gameOver = true;
                stopGame()
                return; // Stop further checks
            }

            // Detect collision with bottom pipe
            if (
                birdRect.right > bottomPipeRect.left &&
                birdRect.left < bottomPipeRect.right &&
                birdRect.bottom > bottomPipeRect.top
            ) {
                gameOver = true;
                stopGame()
                return; // Stop further checks
            }

            // Increase score if no collision
            if (
                birdRect.right > topPipeRect.right && // Bird has passed the pipe
                !obstacle.hasAttribute("scored") // Ensure each obstacle is scored only once
            ) {
                obstacle.setAttribute("scored", "true");
                audio.pause()
                audio.src = 'assets/score-plus.mp3';
                audio.play()
                score++;
                score_btn.textContent = score;
            }
        });
        requestAnimationFrame(checkCollisionOrIncreaseScore)
    };

    const stopGame = () => {
        cancelAnimationFrame(gravityOnBall);
        cancelAnimationFrame(createObstacles);
        cancelAnimationFrame(moveObstacle);
        cancelAnimationFrame(checkCollisionOrIncreaseScore);
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.src = "assets/game-over.mp3";
            audio.play();
        }, 200);
        setTimeout(function () {
            audio.pause();
            audio.currentTime = 0;
            audio.src = "assets/game-over-2.mp3";
            audio.play();
        }, 1500)
        setTimeout(() => {
            stats();
        }, 1700);
    }

    gravityOnBall();
    createObstacles();
    checkCollisionOrIncreaseScore()
    document.addEventListener("click", increaseHeight);
}


const loader = () => {
    const loaderDiv = document.querySelector('.loader');

    // Function to display a message and scale it down after a delay
    const showMessage = (message, duration, delay) => {
        setTimeout(() => {
            loaderDiv.innerHTML = `<h1>${message}</h1>`;
            setTimeout(() => {
            }, duration);
        }, delay);
    };
    const showButton = (btnContent, duration, delay) => {
        setTimeout(() => {
            loaderDiv.innerHTML = `<button>${btnContent}</button>`;
            loaderDiv.querySelector("button").addEventListener("click", function () {
                setTimeout(function () { loaderDiv.style.top = `-110%` }, 1500);
                setTimeout(() => {
                    loaderDiv.remove();
                }, 2000);
                setTimeout(function () {
                    game();
                }, 2000)
            })
            setTimeout(() => {
            }, duration);
        }, delay);
    };

    // Display messages with appropriate timing
    showMessage("Welcome!", 3000, 0);          // Message 1: Duration 2 seconds, starts immediately
    showMessage("Relax and Chill!", 5500, 2500); // Message 2: Duration 3 seconds, starts after 2.3 seconds
    showMessage("Flappy-Bird Game Initializing...", 8000, 5000);
    showMessage("When the game loads..", 9000, 7000);
    showMessage("..just click on the screen.. ", 11000, 9000);
    showMessage("adjust the height of your bird and..", 13000, 11000);
    showMessage("set some high scores! 🎮🚀✨😊", 15000, 13000);
    showButton("Play", 17000, 15000);
};

const stats = () => {
    const statsDiv = document.querySelector(".stats");
    
    // Ensure the stats div is hidden before setting new content
    statsDiv.style.left = `0%`;

    // Clear the previous content before adding new stats
    statsDiv.innerHTML = "";
    
    // Add new stats and the "Play Again" button
    const score = document.querySelector(".score button").textContent;
    statsDiv.innerHTML = `<h1>Your Score is: ${score}</h1><button>Play Again</button>`;

    // Reattach the event listener to the "Play Again" button
    const playAgainButton = statsDiv.querySelector("button");
    playAgainButton.addEventListener("click", function () {
        statsDiv.style.left = `-110%`;
        setTimeout(() => {
            game();  // Restart the game after a short delay
        }, 2000);
    });
}

window.addEventListener("DOMContentLoaded", loader);