const arrayOfSounds = [
    {soundName: "applause",soundUrl:"Assets/crowd-applause-236697.mp3"},
    {soundName: "boo",soundUrl:"Assets/boo-and-laugh-7060.mp3"},
    {soundName: "gasp",soundUrl:"Assets/gasp-7117.mp3"},
    {soundName: "tada",soundUrl:"Assets/tada-fanfare-a-6313.mp3"},
    {soundName: "victory",soundUrl:"Assets/victorymale-version-230553.mp3"},
    {soundName: "wrong",soundUrl:"Assets/wrong-47985.mp3"},
]

const soundsPlayground = document.querySelector(".contents");
const audio = new Audio()

const showSounds = (sounds_array)=>{
    let clutter = ""
    sounds_array.forEach((sound,index) => {
        clutter = clutter + `<div class="sound" id="${index}">${sound.soundName}</div>`;
    })
    soundsPlayground.innerHTML = clutter;
}

const playSounds = ()=>{
    soundsPlayground.addEventListener('click',(event)=>{
        if(event.target.classList[0].toLowerCase() === "sound"){
            audio.src = arrayOfSounds[event.target.id].soundUrl;
            audio.play();
        }
    });
}

showSounds(arrayOfSounds);
playSounds();