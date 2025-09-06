const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style System", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "Which company developed React?",
    answers: [
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Facebook", correct: true },
      { text: "Apple", correct: false }
    ]
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "2000", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    score++;
    selectedBtn.style.background = "green";
  } else {
    selectedBtn.style.background = "red";
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.background = "green";
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
}

