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
    creatingQuestions();
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
    data.splice(data.indexOf(question), 1);
    askedQuestions.push(question);
    return;
}

function reverseQuestion() {
    if (questionNum > 0) {
        questionNum--;
        let question = askedQuestions[questionNum];
        questionDiv.textContent = `${questionNum + 1}. ${question.question}`;
        optionsArr.forEach((val, index) => {
            val.querySelector('.txt').textContent = question.options[index];
        });
    }
}


const app = async () => {
    await fetchingData();
    window.addEventListener("load", loggingQuestions);
    nextQue.addEventListener('click', loggingQuestions);
    backQue.addEventListener('click', reverseQuestion);
}

app();