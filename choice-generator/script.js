const textarea = document.querySelector("textarea");
const choicesArea = document.querySelector(".choices");
let choicesArr = [];
let checkArr = '';
let selectedElemId = '';

textarea.addEventListener("input",(event)=>{
    if(!(event.data === null)){
        let clutter = '';
        choicesArr = textarea.value.split(",");
        choicesArr.forEach((elem,index) => {
            if(containsNonWhitespace(elem)){
                clutter += `<div class="choice" id="${index}">${elem}</div>    `;
            }
        });
        choicesArea.innerHTML = clutter;
    }
    if(event.data === null){
        if(textarea.value == ''){
            choicesArea.innerHTML = "";
        }
    }
})

textarea.addEventListener("keyup",(event)=>{
    if(event.key.toLowerCase() === "enter"){
        if(textarea.value === "\n"){
            textarea.value = "";
            choicesArea.innerHTML = "";
        }
        else if(!(choicesArea.querySelector(".selectedChoice"))){
            checkArr = choicesArea.innerHTML.split("    ");
            let selectedThing = checkArr[filterArr(checkArr)];
            let temDiv = document.createElement("div");
            temDiv.innerHTML = selectedThing;
            setTimeout(() => {
                document.getElementById(temDiv.querySelector(".choice").id).classList.add('selectedChoice');
                textarea.value = ""   
            }, 200);
        }
        else{
            choicesArea.innerHTML = ""
            textarea.value = ""
        }
    }
})
function containsNonWhitespace(str) {
    return /\S/.test(str);
}
function filterArr(array){
    return Math.floor(Math.random() * (array.length - 1)); 
}