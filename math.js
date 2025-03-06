//Create an Array of objects that contain a question,  answers object and correct answer.
const mathQuestions = [
  {
    mquestion: "What is the value of w in the equation 116 - w = 95?",
    mathanswers: { A: "w = 19", B: "w = 21", C: "w = 32" },
    mcorrect: "B",
  },
  {
    mquestion: "Which is a composite number?",
    mathanswers: {
      A: "5",
      B: "7",
      C: "21",
    },
    mcorrect: "C",
  },
  {
    mquestion: "What is 3.8 × 10?",
    mathanswers: { A: "0.38", B: "3.80", C: "38" },
    mcorrect: "C",
  },
  {
    mquestion: "What is the value of 12 - (3 + 5)?",
    mathanswers: { A: "4", B: "10", C: "14" },
    mcorrect: "A",
  },
  {
    mquestion: "Which list is in order from least to greatest?",
    mathanswers: {
      A: "1,000; 1,010; 1,009",
      B: "1,010; 1,011; 1,100",
      C: "1,100; 1,010; 1,001",
    },
    mcorrect: "B",
  },
  {
    mquestion: "Which percent equals 1/4 ?",
    mathanswers: {
      A: "14%",
      B: "25%",
      C: "41%",
    },
    mcorrect: "B",
  },
];

//  create variables currentQuestionIndex and score and set each to  zero
let mathQuestionIndex = 0;
let mathscore = 0;

// Create a function that load the questions
function loadQuestionMath() {
  const mathquestionContainer = document.getElementById("question-container2");
  mathquestionContainer.innerHTML = "";

  const mathcurrentQuestion = mathQuestions[mathQuestionIndex];
  const mathquestionElement = document.createElement("div");
  mathquestionElement.className = "mquestion";

  mathquestionElement.innerHTML = `<p>${mathQuestionIndex + 1}. ${
    mathcurrentQuestion.mquestion
  }</p>`;
  for (const [key, value] of Object.entries(mathcurrentQuestion.mathanswers)) {
    mathquestionElement.innerHTML += `
                      <label>
                          <input type="radio" name="mathanswer" value="${key}">
                          ${key}) ${value}
                      </label>
                  `;
  }

  mathquestionContainer.appendChild(mathquestionElement);
}

//Validate each answer

function validateAnswerMath(mathselectedAnswer) {
  const mathcurrentQuestion = mathQuestions[mathQuestionIndex];
  const mathcorrectAnswer = mathcurrentQuestion.mcorrect;

  if (mathselectedAnswer === mathcorrectAnswer) {
    mathscore++;
    highlightAnswerMath(mathselectedAnswer, true);
  } else {
    highlightAnswerMath(mathselectedAnswer, false);
    highlightAnswerMath(mathcorrectAnswer, true);
  }

  // Show the next button
  document.getElementById("next-button2").classList.remove("hidden2");
}

//Highlight both correct answer and incorrect answers
function highlightAnswerMath(mathanswer, mathisCorrect) {
  const labels = document.querySelectorAll(`input[name="mathanswer"]`);
  labels.forEach((label) => {
    if (label.value === mathanswer) {
      label.parentElement.classList.add(
        mathisCorrect ? "mathcorrect" : "mathincorrect"
      );
    }
  });
}

document.getElementById("quiz-form2").addEventListener("change", (e) => {
  if (e.target.name === "mathanswer") {
    validateAnswerMath(e.target.value);
    // Disable further selection until the answer is validated
    document.querySelectorAll('input[name="mathanswer"]').forEach((input) => {
      input.disabled = true;
    });
  }
});

//show "next button" after an answer is selected until the last question
document.getElementById("next-button2").addEventListener("click", () => {
  mathQuestionIndex++;
  if (mathQuestionIndex < mathQuestions.length) {
    loadQuestionMath();
    document.getElementById("next-button2").classList.add("hidden2");
  } else {
    displayResultMath();
  }
});

// Show final test result
function displayResultMath() {
  const resultDiv2 = document.getElementById("result2");
  resultDiv2.textContent = `Your total score is ${mathscore} out of ${mathQuestions.length}.`;
  resultDiv2.classList.remove("hidden2");
  document.getElementById("question-container2").classList.add("hidden2");
  document.getElementById("next-button2").classList.add("hidden2");
}

// Load the first question
loadQuestionMath();
