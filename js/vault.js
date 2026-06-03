const riddles = [
  {
    q: "I shed my skin but never grow old.",
    a: ["Shadow", "Serpent", "Stone"],
    c: "Serpent"
  },
  {
    q: "What guards hidden worlds?",
    a: ["Gold", "Magic", "Speed"],
    c: "Magic"
  },
  {
    q: "What opens paths unseen?",
    a: ["Fear", "Bravery", "Silence"],
    c: "Bravery"
  }
];

let index = 0;

const riddle = document.getElementById("riddle");
const answers = document.getElementById("answers");
const result = document.getElementById("result");

function load() {
  if (index >= riddles.length) {
    riddle.textContent =
      "The vault opens silently. Not all secrets need witnesses.";
    answers.innerHTML = "";
    return;
  }

  const cur = riddles[index];
  riddle.textContent = cur.q;
  answers.innerHTML = "";
  result.textContent = "";

  cur.a.forEach(x => {
    const btn = document.createElement("button");
    btn.textContent = x;
    btn.onclick = () => {
      if (x === cur.c) {
        result.textContent = "✔ Seal Broken";
        index++;
        setTimeout(load, 700);
      } else {
        result.textContent = "✖ The serpent hisses.";
      }
    };
    answers.appendChild(btn);
  });
}

load();
