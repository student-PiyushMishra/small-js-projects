let questionDiv = document.querySelector(".question");
let optionsArr = document.querySelectorAll(".option");
let nextQue = document.querySelector(".right");
let backQue = document.querySelector(".left");
let data = [];
let askedQuestions = [];
let questionNum = 0;
let answeredArray = [];
let answeredQuestions = [];

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
    renderAnsweredQuestion();
}

const renderAnsweredQuestion = () => {
    if (answeredQuestions.includes(parseInt(questionDiv.textContent.split(".")[0]))) {
        optionsArr.forEach((val, index) => {
            if (val.textContent == answeredArray[answeredQuestions.indexOf(parseInt(questionDiv.textContent.split(".")[0]))].answer) {
                val.querySelector('i').classList.remove('ri-circle-line');
                val.querySelector('i').classList.add('ri-checkbox-circle-fill');
                val.classList.add('correct');
            }
            else {
                val.classList = 'option';
                val.querySelector('i').classList = 'ri-circle-line'
            }
            if (val.textContent == answeredArray[answeredQuestions.indexOf(parseInt(questionDiv.textContent.split(".")[0]))].answerGiven) {
                if (answeredArray[answeredQuestions.indexOf(parseInt(questionDiv.textContent.split(".")[0]))].answerGiven == answeredArray[answeredQuestions.indexOf(parseInt(questionDiv.textContent.split(".")[0]))].answer) { }
                else {
                    val.querySelector('i').classList.remove('ri-circle-line');
                    val.querySelector('i').classList.add('ri-close-circle-fill');
                    val.classList.add('incorrect');
                }
            }
        })
    }
    else {
        optionsArr.forEach((val, index) => {
            if (val.classList.contains('correct')) val.classList.remove("correct");
            if (val.classList.contains('incorrect')) val.classList.remove("incorrect");
            val.querySelector('i').classList = 'ri-circle-line';
        })
    }

    requestAnimationFrame(renderAnsweredQuestion);
}

const creatingQuestions = () => {
    if (data.length === 0) {
        return;
    }
    let question = data[Math.floor(Math.random() * data.length)];
    shuffleArrays(question.options);
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
    renderAnsweredQuestion();
}

function validatingAnswers() {
    document.querySelector(".options").addEventListener("click", function (e) {
        if (answeredQuestions.includes(questionNum)) {
            return;
        }
        let question = askedQuestions[questionNum - 1];
        let target = e.target.closest(".option");
        let obj = { question: question.question, options: question.options, answer: question.answer, answerGiven: target.querySelector('.txt').textContent };
        answeredArray.push(obj);
        answeredQuestions.push(questionNum);
        console.log(answeredQuestions);
        console.log(answeredArray);
        if (questionNum == 0) {
            question = askedQuestions[questionNum];
        }
        optionsArr.forEach((val, index) => {
            if (val.textContent == question.answer) {
                val.querySelector('i').classList.remove('ri-circle-line');
                val.querySelector('i').classList.add('ri-checkbox-circle-fill');
                val.classList.add('correct');
            }
        })
        if (target.querySelector('.txt').textContent != question.answer) {
            target.querySelector('i').classList.remove('ri-circle-line');
            target.querySelector('i').classList.add('ri-close-circle-fill');
            target.classList.add('incorrect');
        }
    })
}

function shuffleArrays(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const app = async () => {
    await fetchingData();
    window.addEventListener("load", loggingQuestions);
    nextQue.addEventListener('click', loggingQuestions);
    backQue.addEventListener('click', reverseQuestion);
    validatingAnswers();
    renderAnsweredQuestion();
}

app();