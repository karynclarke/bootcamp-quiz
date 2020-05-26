var startButton = document.getElementById("start-button");
var startScreen = document.getElementById("start-screen");
var quizScreen = document.getElementById("quiz-screen");
var endScreen = document.getElementById("end-screen");
var question = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var scoreEl = document.getElementById("score")
var time = 60;
var timer;
var timerEl = document.getElementById("timer");
var questionIndex = 0;
var correct = [];

var questions = [
    {
        question: 'In CSS, the space inside a border is defined by?',
        choices: [
            'border',
            'padding',
            'margin',
            'edge'
        ],
        answer: 'padding'
    },
    {
        question: 'True or false, Boolean values can only have one value',
        choices: ['true', 'false'],
        answer: 'true'
    },
    {
        question: 'In HTML, which attribute provides text for screen readers?',
        choices: [
            'title',
            'href',
            'alt',
            'img src'
        ],
        answer: 'alt'
    },
    {
        question: 'In Javascript, to get a number rounded down to the nearest integer, use the command',
        choices: ['math.floor',
            'math.min',
            'math.sin',
            'math.random'
        ],
        answer: 'math.floor'
    },
    {
        question: 'Which is not true about Bootstrap?',
        choices: [
            'files are easily copied',
            'pages not responsive to mobile devices',
            'popular framework',
            'it is free to use'
        ],
        answer: 'pages not responsive to mobile devices'
    }
];

startButton.addEventListener("click", function () {
    startScreen.setAttribute("class", "hide");
    quizScreen.removeAttribute("class", "hide");
    timer = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    startGame();
});

function startGame() {
    buildQuestionCard()

};

function buildQuestionCard() {
    var currentQuestion = questions[questionIndex];
    question.textContent = currentQuestion.question;
    choicesEl.textContent = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choice");
        answerBtn.setAttribute("value", choice);
        answerBtn.textContent = choice;
        answerBtn.onclick = questionClick;
        choicesEl.appendChild(answerBtn);


    })
}

function questionClick() {
    console.log(this.value)
    if (this.value !== questions[questionIndex].answer) {
        console.log("wrong")
        time -= 15;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;

    } else {
        console.log("right")
        correct.push(questions[questionIndex]);
        console.log(correct)
    }
    questionIndex++;
    if (questionIndex === questions.length) {
        endGame();
    } else {
        buildQuestionCard();
    }  //else
}
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endGame();
    }
}
function endGame() {
    clearInterval(timer)
    quizScreen.setAttribute("class", "hide");
    endScreen.removeAttribute("class", "hide");
    var score = time * correct.length;
    scoreEl.textContent = "Your score is " + score;
}