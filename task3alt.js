const quizData = [
  {
    type: "single",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    type: "multi",
    question: "Select all prime numbers:",
    options: ["2", "4", "5", "9"],
    answer: ["2", "5"],
  },
  {
    type: "text",
    question: "Fill in the blank: The capital of France is _____",
    answer: "Paris",
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const data = quizData[currentQuestion];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";

  if (data.type === "single" || data.type === "multi") {
    data.options.forEach(opt => {
      const label = document.createElement("label");
      label.classList.add("option");

      const input = document.createElement("input");
      input.type = data.type === "single" ? "radio" : "checkbox";
      input.name = "option";
      input.value = opt;

      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      optionsEl.appendChild(label);
    });
  } else if (data.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "text-answer";
    input.placeholder = "Type your answer here...";
    input.style.padding = "0.5rem";
    input.style.fontSize = "1rem";
    input.style.width = "100%";
    optionsEl.appendChild(input);
  }

  resultEl.classList.add("hidden");
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
}

function checkAnswer() {
  const data = quizData[currentQuestion];
  let userAnswer;

  if (data.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) return alert("Please select an answer.");
    userAnswer = selected.value;
    if (userAnswer === data.answer) {
      score++;
      resultEl.textContent = "✅ Correct!";
    } else {
      resultEl.textContent = `❌ Incorrect! Correct answer: ${data.answer}`;
    }
  }

  else if (data.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(i => i.value);
    const correct = data.answer.sort().toString();
    if (selected.sort().toString() === correct) {
      score++;
      resultEl.textContent = "✅ Correct!";
    } else {
      resultEl.textContent = `❌ Incorrect! Correct answers: ${data.answer.join(", ")}`;
    }
  }

  else if (data.type === "text") {
    const input = document.getElementById("text-answer").value.trim().toLowerCase();
    if (!input) return alert("Please enter an answer.");
    if (input === data.answer.toLowerCase()) {
      score++;
      resultEl.textContent = "✅ Correct!";
    } else {
      resultEl.textContent = `❌ Incorrect! Correct answer: ${data.answer}`;
    }
  }

  submitBtn.classList.add("hidden");
  resultEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  questionEl.textContent = "🎉 Quiz Complete!";
  optionsEl.innerHTML = `<p>Your final score is <strong>${score}/${quizData.length}</strong></p>`;
  submitBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultEl.classList.add("hidden");
}

// Initial load
loadQuestion();
submitBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", nextQuestion);
