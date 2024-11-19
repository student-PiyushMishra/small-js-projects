// document.querySelector(".child2").addEventListener('click',()=>{
//     document.querySelector('.box').style.transform = "rotate(90deg)";
//     setTimeout(() => {
//         document.querySelector('.box').style.transform = "rotate(0deg)";
//     }, 1000);
// })
// document.querySelector(".child1").addEventListener('click',()=>{
//     document.querySelector('.box').style.transform = "rotate(-90deg)";
//     setTimeout(() => {
//         document.querySelector('.box').style.transform = "rotate(0deg)";
//     }, 1000);
// })

let menu = document.querySelector(".box>.lower>.child1");
let cross = document.querySelector(".box>.lower>.child2");
let circle = document.querySelector(".box");
let article = document.querySelector(".article");
let nav = document.querySelector(".nav");

menu.addEventListener("click",function(){
    circle.style.transform = 'rotate(-90deg)';
    article.classList.add("article-twist");
    nav.style.opacity = 1;
})
cross.addEventListener("click",function(){
    circle.style.transform = 'rotate(0deg)';
    article.classList.remove("article-twist");
    nav.style.opacity = 0;
})