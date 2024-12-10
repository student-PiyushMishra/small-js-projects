const glassesDiv = document.querySelector(".glasses");
const glasses = document.querySelectorAll(".glass");
glassesDiv.addEventListener("click",(e)=>{
    if(e.target.classList.contains("glass")){
        glasses.forEach(val=>{
            if(parseInt(val.id)<=e.target.id){
                val.classList.add("fill");
            }
            else{
                if(val.classList.contains('fill')){
                    val.classList.remove('fill')
                }
            }
        })
    }
    fillContainer()
})

const fillContainer = ()=>{
    const filledGlasses = document.querySelectorAll(".glass.fill").length;
    const totalGlasses = 8;
    const filledPercentage = filledGlasses*100/totalGlasses;
    const percentDiv = document.querySelector("#percent span");
    const filledDiv = document.querySelector('.fill');
    const levelDiv = document.querySelector(".remains");
    const totalWater = 2000;
    const waterDrunken = filledGlasses * 250;
    const remainingWater = document.querySelector("#remaining-water");
    let waterRemaining = totalWater - waterDrunken;
    remainingWater.textContent = `${waterRemaining/1000}L`
    percentDiv.textContent = `${filledPercentage}%`;
    filledDiv.style.height = `${filledPercentage}%`;
    levelDiv.style.height = `${100-filledPercentage}%`;
}