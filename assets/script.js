// so many variables! Buttons, screens, timer elements
var startButton = document.getElementById("start-button");
var startScreen = document.getElementById("start-screen");
var quizScreen = document.getElementById("quiz-screen");
var endScreen = document.getElementById("end-screen");
var question = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var scoreEl = document.getElementById("score");
var time = 60;
var timer;
var timerEl = document.getElementById("timer");
var questionIndex = 0;
var correct = [];
var score;
var button = document.getElementById("save-score");


// all of the questions, with choices in array //
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


// the start button and timer clock 
startButton.addEventListener("click", function () {
    startScreen.setAttribute("class", "hide");
    quizScreen.removeAttribute("class", "hide");
    timer = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    startGame();
});

// moves on to the questions 
function startGame() {
    buildQuestionCard()
};

// the questions
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

// if the answer is wrong they lose time 
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
        
    }
    questionIndex++;
    if (questionIndex === questions.length) {
        endGame();
    } else {
        buildQuestionCard();
    }  
}
    

//the clock ends when the game is over or time is up 
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endGame();
    }
}

//what happens when the game is done, number correct multiplied by time left.  
function endGame() {
    clearInterval(timer)
    quizScreen.setAttribute("class", "hide");
    endScreen.removeAttribute("class", "hide");
    score = time * correct.length;
    scoreEl.textContent = "Your score is " + score;    
}
function saveScore() {
}

button.addEventListener("click", function() {
console.log("score=" + score);
localStorage.setItem("score", score);
});











    
      
  


