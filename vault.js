const riddles = [
  {
    text: "I have no wings, yet I cross worlds.",
    choices: ["Time", "Wind", "Dreams"],
    answer: "Dreams"
  },
  {
    text: "I guard secrets without speaking.",
    choices: ["Stone", "Fire", "Gold"],
    answer: "Stone"
  },
  {
    text: "Only the brave may pass unseen.",
    choices: ["Strength", "Silence", "Speed"],
    answer: "Silence"
  }
];

let current = 0;

const riddleEl = document.getElementById("riddle");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");

function loadRiddle() {
  if (current >= riddles.length) {
    riddleEl.textContent =
      "The vault opens. Some secrets remain unspoken.";
    choicesEl.innerHTML = "";
    return;
  }

  const r = riddles[current];
  riddleEl.textContent = r.text;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";

  r.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === r.answer) {
        current++;
        loadRiddle();
      } else {
        feedbackEl.textContent =
          "The vault remains sealed.";
      }
    };
    choicesEl.appendChild(btn);
  });
}

loadRiddle();
