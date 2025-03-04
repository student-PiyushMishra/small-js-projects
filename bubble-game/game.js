let timer = document.querySelector("#time span");
let scoreBoard = document.querySelector("#score span");
let bubble = document.querySelectorAll(".bubble");
let gamearea = document.querySelector(".gamearea");
let hit = document.querySelector("#game-num span")

let time = 60;
let gameStarted = false;

function updateTime() {
    if (!gameStarted) {
        gameStarted = true; // Set the flag to true to prevent restarting the timer
        let interval = setInterval(() => {
            time--;
            timer.textContent = time;
            if (time <= 0) {
                alert("Time Lapsed!");
                clearInterval(interval);
                gameStarted = false; // Reset the flag when the game ends
                // Optionally, reset score and bubbles here
                scoreBoard.textContent = '00'; // Reset score display
                showBubbles(); // Show new bubbles for next round
                time = 60; // Reset time for next round if needed
            }
        }, 1000);
    }
}

function increseScore(){
    let score = 0;
    gamearea.addEventListener("click",function(event){
        if(event.target.classList.contains("bubble")){
            if(Number(event.target.textContent) == Number(hit.textContent)){
                score = Number(event.target.textContent) + score;
            }
        }
        scoreBoard.textContent = score;
        showBubbles()
    })
}

function game(){
    let gamepad = document.querySelector(".gamepad");
    gamepad.addEventListener("click",function(){
        updateTime()
    })

}

function showBubbles(){
    bubble.forEach(elem => {
        elem.textContent = getRandomDigit()
    })
    hit.textContent = getRandomDigit()
}

function getRandomDigit() {
    return Math.floor(Math.random() * 9) + 1;
}

showBubbles()
game()
increseScore()