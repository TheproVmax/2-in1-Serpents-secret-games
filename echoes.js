const words = [
  "stone",
  "silence",
  "coil",
  "shadow",
  "gate"
];

let level = 3;

const sequenceEl = document.getElementById("sequence");
const inputEl = document.getElementById("input");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit");

function showSequence() {
  const sequence = words.slice(0, level);
  sequenceEl.textContent = sequence.join(" — ");

  setTimeout(() => {
    sequenceEl.textContent = "The echo fades.";
  }, 2000);
}

submitBtn.onclick = () => {
  const answer = inputEl.value.trim().toLowerCase();
  const correct = words.slice(0, level).join(" ");

  if (answer === correct) {
    level++;
    inputEl.value = "";

    if (level > words.length) {
      resultEl.textContent =
        "All echoes answered. The serpent listens.";
      submitBtn.disabled = true;
      return;
    }

    resultEl.textContent =
      "The echo answers you. Listen again.";
    showSequence();
  } else {
    resultEl.textContent =
      "The echo breaks. Remember carefully.";
  }
};

showSequence();
