// Built slowly. Mistakes included.

const story = document.getElementById("story");
const choices = document.getElementById("choices");
const meter = document.getElementById("meter");

let curiosity = 0;
let current = 0;

const worlds = [
  "A low hiss moves through the World of Serpents.",
  "The space between worlds tightens around you.",
  "Shadows remember things you do not.",
  "Something ancient is watching.",
  "This world feels uncomfortably familiar."
];

function render() {
  if (current >= worlds.length) {
    story.textContent = "You have reached the end of the known worlds.";
    choices.innerHTML = "";
    return;
  }

  story.textContent = worlds[current];
  choices.innerHTML = "";

  addChoice("Look closer", 2);
  addChoice("Move carefully", 1);
  addChoice("Step away", 0);
}

function addChoice(text, risk) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = () => choose(risk);
  choices.appendChild(btn);
}

function choose(risk) {
  curiosity += risk;
  current++;

  if (curiosity >= 7) {
    story.textContent =
      "Something shifts behind you. You looked too deeply.";
    choices.innerHTML = "";
    return;
  }

  meter.textContent = `Curiosity: ${curiosity}`;
  render();
}

render();
