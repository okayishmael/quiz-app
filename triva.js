//Create an Array of objects that contain a question,  answers object and correct answer.
const questions = [
  {
    question: "What is the capital of France?",
    answers: { A: "Berlin", B: "Paris", C: "Madrid" },
    correct: "B",
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: {
      A: "Charles Dickens",
      B: "William Shakespeare",
      C: "Leo Tolstoy",
    },
    correct: "B",
  },
  {
    question: "What is the largest planet in our Solar System?",
    answers: { A: "Earth", B: "Jupiter", C: "Saturn" },
    correct: "B",
  },
  {
    question: "What is the chemical symbol for water?",
    answers: { A: "O2", B: "H2O", C: "CO2" },
    correct: "B",
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: {
      A: "Vincent Van Gogh",
      B: "Pablo Picasso",
      C: "Leonardo da Vinci",
    },
    correct: "C",
  },
  {
    question: "Who styled this app?",
    answers: {
      A: "Ishmael Sunday",
      B: "Pablo Picasso",
      C: "Leonardo da Vinci",
    },
    correct: "A",
  },
];

//  create variables currentQuestionIndex and score and set each to  zero
let currentQuestionIndex = 0;
let score = 0;

// Create a function that load the questions
function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.className = "question";

  questionElement.innerHTML = `<p>${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }</p>`;
  for (const [key, value] of Object.entries(currentQuestion.answers)) {
    questionElement.innerHTML += `
                      <label>
                          <input type="radio" name="answer" value="${key}">
                          ${key}) ${value}
                      </label>
                  `;
  }

  questionContainer.appendChild(questionElement);
}

//Validate each answer

function validateAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;

  if (selectedAnswer === correctAnswer) {
    score++;
    highlightAnswer(selectedAnswer, true);
  } else {
    highlightAnswer(selectedAnswer, false);
    highlightAnswer(correctAnswer, true);
  }

  // Show the next button
  document.getElementById("next-button").classList.remove("hidden");
}

//Highlight both correct answer and incorrect answers
function highlightAnswer(answer, isCorrect) {
  const labels = document.querySelectorAll(`input[name="answer"]`);
  labels.forEach((label) => {
    if (label.value === answer) {
      label.parentElement.classList.add(isCorrect ? "correct" : "incorrect");
    }
  });
}

document.getElementById("quiz-form").addEventListener("change", (e) => {
  if (e.target.name === "answer") {
    validateAnswer(e.target.value);
    // Disable further selection until the answer is validated
    document.querySelectorAll('input[name="answer"]').forEach((input) => {
      input.disabled = true;
    });
  }
});

//show "next button" after an answer is selected until the last question
document.getElementById("next-button").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById("next-button").classList.add("hidden");
  } else {
    displayResult();
  }
});

// Show final test result
function displayResult() {
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Your total score is ${score} out of ${questions.length}.`;
  resultDiv.classList.remove("hidden");
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("next-button").classList.add("hidden");
}

// Load the first question
loadQuestion();
