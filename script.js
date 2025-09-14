// script.js
const API_URL = "https://ai-study-tutor-j5ju.onrender.com/api/chat";

async function callOpenAI(prompt) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (data.error) return "⚠️ API Error: " + data.error.message;
    return data.choices?.[0]?.message?.content || "⚠️ No response returned.";
  } catch (err) {
    return "⚠️ Network Error: " + err.message;
  }
}

const summarizeBtn = document.getElementById("summarizeBtn");
const generateQuizBtn = document.getElementById("generateQuizBtn");
const contentInput = document.getElementById("contentInput");
const summaryLengthSelect = document.getElementById("summaryLengthSelect");
const quizDifficultySelect = document.getElementById("quizDifficultySelect");
const summaryCard = document.getElementById("summaryCard");
const summaryText = document.getElementById("summaryText");
const quizCard = document.getElementById("quizCard");
const quizText = document.getElementById("quizText");

summarizeBtn.addEventListener("click", async () => {
  const content = contentInput.value.trim();
  if (!content) { alert("Please enter content to summarize."); return; }
  summarizeBtn.disabled = true; summarizeBtn.textContent = "Summarizing...";
  try {
    const prompt = `Summarize this text in a ${summaryLengthSelect.value} way:\n\n${content}`;
    const summary = await callOpenAI(prompt);
    summaryText.textContent = summary;
    summaryCard.style.display = "block";
  } finally {
    summarizeBtn.disabled = false; summarizeBtn.textContent = "Summarize";
  }
});

generateQuizBtn.addEventListener("click", async () => {
  const content = contentInput.value.trim();
  if (!content) { alert("Please enter content to generate a quiz."); return; }
  generateQuizBtn.disabled = true; generateQuizBtn.textContent = "Generating Quiz...";
  try {
    const prompt = `Generate a ${quizDifficultySelect.value} difficulty quiz with 3 questions (multiple choice, true/false, or short answer) based on the following content:\n\n${content}`;
    const quiz = await callOpenAI(prompt);
    quizText.innerHTML = marked.parse(quiz);
    quizCard.style.display = "block";
  } finally {
    generateQuizBtn.disabled = false; generateQuizBtn.textContent = "Generate Quiz";
  }
});

const toggleModeBtn = document.getElementById('toggleModeBtn');
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleModeBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});