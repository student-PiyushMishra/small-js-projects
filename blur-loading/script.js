const overlay = document.querySelector('.overlay');
const loadpercent = document.querySelector(".load-percent");
let loadAmount = 100;
let blurAmount = 50;

const loader = () => {
    for (let i = blurAmount; i >= 0; i -= 1) {
        setTimeout(() => {
            overlay.style.backdropFilter = `blur(${i}px)`;
        }, (blurAmount - i) * 50);
    }
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          loadpercent.innerHTML = `${i}%`;
          if (i === 100) {
            setTimeout(() => {
              loadpercent.style.display = 'none';
            }, 200); 
          }
        }, i * 25); 
      }
}
window.addEventListener('DOMContentLoaded',loader)