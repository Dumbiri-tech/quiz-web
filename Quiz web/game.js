const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the javascript?",
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripted>',
        answer: 1
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: 'msgBox("Hello World")',
        choice2: 'alertBox("Hello World")',
        choice3: 'msg("Hello World")',
        choice4: 'alert("Hello World")',
        answer: 4
    },
    {
        question: "what is the correct syntax for reffering to an external script called 'xxx.js'?",
        choice1: '<script href= "xxx.js">',
        choice2: '<script name= "xxx.js">',
        choice3: '<script src= "xxx.js">',
        choice4: '<script file= "xxx.js">',
        answer: 3
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // go to end page
        return window.location.assign("/end.html")
    }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
     const number = choice.dataset["number"];
     choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
       if (!acceptingAnswers) return;

       acceptingAnswers = false;
       const selectedChoices = e.target;
       const selectedAnswers = selectedChoices.dataset["number"];

    //    checkimg for correct answers
    // const classToApply = "incorrect";
    //   if (selectedAnswers == currentQuestion.answer) {
    //      classToApply = "correct"
    //   }

    const classToApply = selectedAnswers == currentQuestion.answer ? "correct"
    : "incorrect";
           console.log(classToApply);

        //    adding the correct and incorrect classes
        selectedChoices.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoices.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000);
       
    });
});

startGame()