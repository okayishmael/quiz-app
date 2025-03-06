//Create an Array of objects that contain a question,  answers object and correct answer.
const squestions = [
  {
    squestion:
      "What do we call the process when water turns from a liquid to a gas?",
    sanswers: { A: "Condensation", B: "Evaporation", C: "Precipitation" },
    scorrect: "B",
  },
  {
    squestion: "Which animal is a mammal?",
    sanswers: {
      A: "Fish",
      B: "Snake",
      C: "Dog",
    },
    scorrect: "C",
  },
  {
    squestion: "What is the largest planet in our Solar System?",
    sanswers: { A: "Earth", B: "Jupiter", C: "Saturn" },
    scorrect: "B",
  },
  {
    squestion: "What is the chemical symbol for water?",
    sanswers: { A: "O2", B: "H2O", C: "CO2" },
    scorrect: "B",
  },
  {
    squestion: "What is the main source of light on Earth?",
    sanswers: {
      A: "Moon",
      B: "Sun",
      C: "Fire",
    },
    scorrect: "B",
  },
  {
    squestion: "What is the part of a plant that absorbs water from the soil?",
    sanswers: {
      A: "Roots",
      B: "Flowers",
      C: "Stem",
    },
    scorrect: "A",
  },
];

//  create variables currentQuestionIndex and score and set each to  zero
let scurrentQuestionIndex = 0;
let sscore = 0;

// Create a function that load the questions
function loadQuestionSci() {
  const squestionContainer = document.getElementById("squestion-container");
  squestionContainer.innerHTML = "";

  const scurrentQuestion = squestions[scurrentQuestionIndex];
  const squestionElement = document.createElement("div");
  squestionElement.className = "squestion";

  squestionElement.innerHTML = `<p>${scurrentQuestionIndex + 1}. ${
    scurrentQuestion.squestion
  }</p>`;
  for (const [key, value] of Object.entries(scurrentQuestion.sanswers)) {
    squestionElement.innerHTML += `
                      <label>
                          <input type="radio" name="sanswer" value="${key}">
                          ${key}) ${value}
                      </label>
                  `;
  }

  squestionContainer.appendChild(squestionElement);
}

//Validate each answer

function validateAnswerSci(selectedsAnswer) {
  const scurrentQuestion = squestions[scurrentQuestionIndex];
  const scorrectAnswer = scurrentQuestion.scorrect;

  if (selectedsAnswer === scorrectAnswer) {
    sscore++;
    highlightAnswerSci(selectedsAnswer, true);
  } else {
    highlightAnswerSci(selectedsAnswer, false);
    highlightAnswerSci(scorrectAnswer, true);
  }

  // Show the next button
  document.getElementById("next-button-sci").classList.remove("hidden-sci");
}

//Highlight both correct answer and incorrect answers
function highlightAnswerSci(sanswer, sisCorrect) {
  const labels = document.querySelectorAll(`input[name="sanswer"]`);
  labels.forEach((label) => {
    if (label.value === sanswer) {
      label.parentElement.classList.add(
        sisCorrect ? "correct-sci" : "incorrect-sci"
      );
    }
  });
}

document.getElementById("quiz-form-sci").addEventListener("change", (e) => {
  if (e.target.name === "sanswer") {
    validateAnswerSci(e.target.value);
    // Disable further selection until the answer is validated
    document.querySelectorAll('input[name="sanswer"]').forEach((input) => {
      input.disabled = true;
    });
  }
});

//show "next button" after an answer is selected until the last question
document.getElementById("next-button-sci").addEventListener("click", () => {
  scurrentQuestionIndex++;
  if (scurrentQuestionIndex < squestions.length) {
    loadQuestionSci();
    document.getElementById("next-button-sci").classList.add("hidden-sci");
  } else {
    displayResultSci();
  }
});

// Show final test result
function displayResultSci() {
  const resultDivSci = document.getElementById("-result-sci");
  resultDivSci.textContent = `Your total score is ${sscore} out of ${squestions.length}.`;
  resultDivSci.classList.remove("hidden-sci");
  document.getElementById("squestion-container").classList.add("hidden-sci");
  document.getElementById("next-button-sci").classList.add("hidden-sci");
}

// Load the first question
loadQuestionSci();
