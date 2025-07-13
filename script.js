const paragraphs = [
  "Typing is not just a skill but a superpower in the digital age. With every keystroke, you translate thought into action. Consistent typing practice enhances your memory, builds focus, and trains your fingers to flow effortlessly. Whether you're coding, writing, or responding to emails, your typing speed directly influences your productivity. It's not about being fast — it's about being accurate and efficient under pressure. Every mistake teaches your brain to correct itself faster. So, let your hands dance on the keyboard, because every session you complete brings you closer to mastery.",
  "Great typists aren't born — they are built. Speed and accuracy come from practice, repetition, and rhythm. The key is to type with intent, not just speed. It's about reducing friction between mind and fingers, so the words you think appear without delay. It’s okay to make mistakes. What matters is correcting them quickly and not losing momentum. Like musicians practicing scales, you are training muscle memory. Focus on posture, breathing, and flow. Typing is not about stress — it’s about smooth execution and mental clarity.",
  "In our world of constant communication, typing is your passport to clarity. The faster you can type with accuracy, the more your ideas can flow unfiltered. Typing fast isn’t about racing the clock — it’s about syncing your thoughts with your fingers. Trust the rhythm. Let your eyes scan ahead while your fingers follow the path. Errors? They happen. But every error corrected sharpens your awareness. Don’t try to be perfect. Try to be present — that’s where speed truly builds.",
  "The act of typing sharpens your brain like few other daily tasks. It demands memory, motor skills, timing, and discipline. Want to improve faster? Type with a purpose. Whether it’s quotes, stories, or challenges, choose material that makes you think. Feel the keys beneath your fingers, breathe steadily, and focus only on the next word. Push distractions away. This moment is yours. As you type each line, remember — every keystroke is progress toward a better, faster, more focused version of you.",
  "Typing is a game of awareness. Your eyes must read ahead while your fingers strike the right keys. Each missed letter teaches your brain what to avoid next time. High WPM isn’t a gift — it’s a grind. Like athletes training drills, typists train through errors and frustration. But if you keep showing up, you'll get faster, smoother, and sharper. Let go of speed at first. Build your accuracy, then build your flow. Eventually, the rhythm of the keyboard becomes second nature.",
  "To type at 300 WPM, you don’t just need speed — you need complete clarity. You must trust your muscle memory, your reflexes, and your ability to adapt mid-flow. Each word is a test of your attention. Each sentence is a challenge in rhythm. Stay relaxed. Don’t grip the keyboard. Glide over it. Maintain posture and let your breath pace your flow. Typing fast is more about control than chaos. Practice makes permanent — and perfection comes from patterns, not pressure.",
  "Imagine a river. It doesn’t rush — it flows. That’s how your typing should feel. Don’t force speed. Instead, reduce the resistance. Keep your posture right, eliminate distractions, and center your focus on the next few words — not the whole paragraph. Smoothness comes first, then speed. The best typists aren’t tense; they’re tuned in. Let your hands do what they were trained to do. Trust your training. Let your typing become an extension of your thoughts.",
  "A great typing test doesn't just challenge your fingers — it challenges your mindset. Can you stay calm under pressure? Can you remain focused when your eyes see one word and your brain thinks of another? Typing teaches patience, discipline, and flow. You’re not just racing against time. You’re racing against the version of you who typed yesterday. Track your progress, celebrate the little wins, and don’t stop — because your fingers will always be faster tomorrow than they are today.",
  "Typing is about entering the zone. When you’re truly focused, the words appear without effort. You don’t think about individual keys — your brain handles that in the background. All you feel is the flow. That’s the real goal: flow typing. It’s not about speed records. It’s about consistency, calmness, and clarity. Let the paragraph guide you. Let the rhythm carry you. Don’t break it for mistakes — recover and move on. That’s how pros do it. That’s how you get better.",
  "The keyboard is a battleground. But you're not fighting the paragraph — you're fighting hesitation. Every key you press without thinking adds to your confidence. Every hesitation you overcome sharpens your edge. Speed is nothing without control. Practice is nothing without intent. So train your mind as much as your hands. Think ahead. Breathe. Flow. One paragraph at a time, you’re building more than speed. You’re building a mindset that thrives on precision, awareness, and control."
];

const typingBox = document.getElementById("typing-box");
const wpmDisplay = document.getElementById("wpm");
const timerButtons = document.querySelectorAll(".timer-buttons button");

let timeLimit = 30;
let timer = null;
let startTime = null;
let charIndex = 0;
let isFinished = false;
let currentParagraph = "";

function getRandomParagraph() {
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function renderParagraph() {
  currentParagraph = getRandomParagraph();
  typingBox.classList.remove("fade-in");
  void typingBox.offsetWidth;
  typingBox.innerHTML = "";

  currentParagraph.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.classList.add("char");
    span.innerText = char;
    if (i === 0) span.classList.add("active");
    typingBox.appendChild(span);
  });

  typingBox.classList.add("fade-in");
}

function startTest() {
  clearTimeout(timer);
  charIndex = 0;
  isFinished = false;
  wpmDisplay.innerText = "0";
  startTime = null;
  renderParagraph();
}

function finishTest() {
  const duration = (Date.now() - startTime) / 60000;
  const correctChars = document.querySelectorAll(".correct").length;
  const wpm = Math.round(correctChars / 5 / duration);
  wpmDisplay.innerText = wpm;
  isFinished = true;
}

typingBox.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (isFinished) return;

  if (!startTime) {
    startTime = Date.now();
    timer = setTimeout(finishTest, timeLimit * 1000);
  }

  const spans = typingBox.querySelectorAll("span");
  const char = e.key;

  if (char === "Backspace") {
    if (charIndex > 0) {
      spans[charIndex].classList.remove("active");
      charIndex--;
      spans[charIndex].classList.remove("correct", "incorrect");
      spans[charIndex].classList.add("active");
    }
    return;
  }

  if (char.length !== 1 || charIndex >= spans.length) return;

  const currentChar = spans[charIndex].innerText;

  if (char === currentChar) {
    spans[charIndex].classList.add("correct");
  } else {
    spans[charIndex].classList.add("incorrect");
  }

  spans[charIndex].classList.remove("active");
  charIndex++;

  if (charIndex < spans.length) {
    spans[charIndex].classList.add("active");

    // ✅ Auto scroll as you type
    spans[charIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }
});

timerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    timerButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    timeLimit = parseInt(btn.getAttribute("data-time"));
    startTest();
  });
});

// Start when page loads
startTest();
