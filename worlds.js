// Built slowly. Mistakes included.

const story = document.getElementById("story");
const choices = document.getElementById("choices");
const meter = document.getElementById("meter");

let curiosity = 0;
let trust = 0;
let current = 0;

const worlds = [
  {
    text: "The World of Serpents coils around your thoughts.",
    choices: [
      { label: "Listen to the whisper", c: 2, t: 0 },
      { label: "Ignore it", c: 0, t: 1 }
    ]
  },
  {
    text: "The space between worlds bends when you breathe.",
    choices: [
      { label: "Step forward anyway", c: 2, t: -1 },
      { label: "Wait and observe", c: 1, t: 1 }
    ]
  },
  {
    text: "Shadows gather, familiar but unfinished.",
    choices: [
      { label: "Ask who they are", c: 1, t: 0 },
      { label: "Turn away", c: 0, t: 1 }
    ]
  },
  {
    text: "Something ancient is measuring you.",
    choices: [
      { label: "Meet its gaze", c: 2, t: -1 },
      { label: "Lower your eyes", c: 0, t: 1 }
    ]
  },
  {
    text: "The Mortal World remembers your name.",
    choices: [
      { label: "Accept it", c: 1, t: 1 },
      { label: "Deny it", c: 2, t: -1 }
    ]
  }
];

function render() {
  if (current >= worlds.length) {
    ending();
    return;
  }

  story.textContent = worlds[current].text;
  choices.innerHTML = "";

  worlds[current].choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.label;
    btn.onclick = () => pick(choice);
    choices.appendChild(btn);
  });

  meter.textContent = `Curiosity: ${curiosity} | Trust: ${trust}`;
}

function pick(choice) {
  curiosity += choice.c;
  trust += choice.t;
  current++;

  if (curiosity >= 7) {
    story.textContent =
      "You went too far. Some knowledge does not return you unchanged.";
    choices.innerHTML = "";
    return;
  }

  render();
}

function ending() {
  choices.innerHTML = "";

  if (trust >= 3 && curiosity < 6) {
    story.textContent =
      "You pass between worlds carrying truth, not hunger.";
  } else if (curiosity >= 5) {
    story.textContent =
      "You leave knowing much, understood by little.";
  } else {
    story.textContent =
      "You return unchanged, though something followed you.";
  }
}

render();
