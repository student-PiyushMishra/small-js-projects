let questionDiv = document.querySelector(".question");
let optionsArr = document.querySelectorAll(".option");
let nextQue = document.querySelector(".right");
let backQue = document.querySelector(".left");
let data = [];
let askedQuestions = [];
let questionNum = 0;

function fetchData() {
    return fetch('questions.json')
        .then(response => response.json())
        .then(JSONdata => {
            data = JSONdata;
            return JSONdata;
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
async function fetchingData() {
    await fetchData();
}

const loggingQuestions = async () => {
    if (questionNum == askedQuestions.length) {
        creatingQuestions();
    }
    if (questionNum < askedQuestions.length) {
        let question = askedQuestions[questionNum];
        questionDiv.textContent = `${questionNum + 1}. ${question.question}`;
        optionsArr.forEach((val, index) => {
            val.querySelector('.txt').textContent = question.options[index];
        });
        questionNum++;
    }
}

const creatingQuestions = () => {
    if (data.length === 0) {
        return;
    }
    let question = data[Math.floor(Math.random() * data.length)];
    shuffleArrays(question.options)
    data.splice(data.indexOf(question), 1);
    askedQuestions.push(question);
    return;
}

function reverseQuestion() {
    if (questionNum > 0) {
        if (questionNum == 1) {
            return;
        }
        questionNum--;
        let question = askedQuestions[questionNum - 1];
        questionDiv.textContent = `${questionNum}. ${question.question}`;
        optionsArr.forEach((val, index) => {
            val.querySelector('.txt').textContent = question.options[index];
        });
    }
}

function validatingAnswers() {
    document.querySelector(".options").addEventListener("click", function (e) {
        let question = askedQuestions[questionNum - 1];
        if (questionNum == 0) {
            question = askedQuestions[questionNum];
        }
        console.log(questionNum)
        optionsArr.forEach((val, index) => {
            
        })
        let target = e.target.closest(".option");
    })
}

function shuffleArrays(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i],array[j]] = [array[j],array[i]];
    }
    return array;
}

const app = async () => {
    await fetchingData();
    window.addEventListener("load", loggingQuestions);
    nextQue.addEventListener('click', loggingQuestions);
    backQue.addEventListener('click', reverseQuestion);
    validatingAnswers()
}

app();