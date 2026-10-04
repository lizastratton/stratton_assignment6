var questionsArr = [
    {
        question: 'Which vegetable was originally carved into jack-o-lanterns in Ireland?',
        answer: 'Turnips',
        options: [
            'Pumpkins',
            'Turnips',
            'Potatoes',
            'Carrots'
        ]
    },
    {
        question: 'What animal is commonly associated with witches?',
        answer: 'Black cat',
        options: [
            'Black cat',
            'Rabbit',
            'Fox',
            'Crow'
        ]
    },
    {
        question: 'What is a group of witches traditionally called?',
        answer: 'Coven',
        options: [
            'Flock',
            'Coven',
            'Pack',
            'Circle'
        ]
    },
    {
        question: 'Which candy is traditionally shaped like a yellow, orange, and white triangle?',
        answer: 'Candy corn',
        options: [
            'Caramel',
            'Taffy',
            'Candy corn',
            'Gumdrop'
        ]
    },
    {
        question: 'On what date is Halloween celebrated?',
        answer: 'October 31',
        options: [
            'October 13',
            'October 30',
            'October 31',
            'November 1'
        ]
    }
];


var quiz = document.querySelector('#quiz');

var currentQuestion = 0;
var correctAnswers = 0;
var timerId;


function showStartScreen() {
    quiz.innerHTML = '';

    var previousScore = localStorage.getItem('previous-score');

    if (previousScore !== null) {
        var scoreText = document.createElement('p');
        scoreText.textContent = 'Previous Score: ' + previousScore + '%';

        quiz.appendChild(scoreText);
    }

    var startButton = document.createElement('button');

    startButton.textContent = 'Start Quiz!';
    startButton.id = 'start-quiz';

    startButton.addEventListener('click', function () {
        startQuiz();
    });

    quiz.appendChild(startButton);
}


function startQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;

    showQuestion();
}


function showQuestion() {
    quiz.innerHTML = '';

    var questionText = document.createElement('p');

    questionText.textContent = questionsArr[currentQuestion].question;

    quiz.appendChild(questionText);

    var optionsDiv = document.createElement('div');

    questionsArr[currentQuestion].options.forEach(function (option) {
        var optionButton = document.createElement('button');

        optionButton.textContent = option;

        optionButton.addEventListener('click', function () {
            clearInterval(timerId);

            if (option === questionsArr[currentQuestion].answer) {
                correctAnswers++;
            }

            nextQuestion();
        });

        optionsDiv.appendChild(optionButton);
    });

    quiz.appendChild(optionsDiv);

    startTimer();
}


function startTimer() {
    var seconds = 30;

    var timerText = document.createElement('p');
    timerText.textContent = seconds;

    quiz.appendChild(timerText);

    timerId = setInterval(function () {
        seconds--;

        timerText.textContent = seconds;

        if (seconds === 0) {
            clearInterval(timerId);

            nextQuestion();
        }
    }, 1000);
}


function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questionsArr.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}


function endQuiz() {
    clearInterval(timerId);

    var score = Math.round(
        (correctAnswers / questionsArr.length) * 100
    );

    localStorage.setItem('previous-score', score);

    showStartScreen();
}


showStartScreen();