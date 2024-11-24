const hoverboard = document.querySelector(".hoverboard");
const boxes = document.querySelectorAll(".box");
const audio = new Audio;

document.querySelector("button").addEventListener("click", function() {
    this.style.opacity = 0;
    audio.src = "assets/stop-13692.mp3";
})

hoverboard
    .addEventListener("mouseover", (event) => {
        if (event.target.classList == "box") {
            let color = `rgba(${generateRandomColor()},${generateRandomColor()},${generateRandomColor()},1)`
            event.target.style.backgroundColor = color;
            event.target.style.boxShadow = `0px 0px 10px ${color}`;
            audio.play();
        }
    })

boxes.forEach(elem => {
    elem.addEventListener("mouseleave", () => {
        setTimeout(() => {
            elem.style.backgroundColor = `rgb(42, 41, 41)`;
            elem.style.boxShadow = `0px 0px 2px rgba(255, 255, 255, 0.262)`;
        }, 1000);
    })
})

const generateRandomColor = () => {
    return Math.floor(Math.random() * 256);
}