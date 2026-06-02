// Built slowly. Mistakes included.

const maze = document.getElementById("maze");
const statusText = document.getElementById("status");

const size = 7;
let player = { x: 0, y: 0 };
let sigil = { x: 5, y: 5 };
let exit = { x: 6, y: 6 };
let steps = 0;

maze.style.gridTemplateColumns = `repeat(${size}, 40px)`;

function draw() {
  maze.innerHTML = "";

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");

      if (player.x === x && player.y === y) {
        cell.textContent = "✦";
      } else if (sigil && sigil.x === x && sigil.y === y) {
        cell.textContent = "●";
      } else if (!sigil && exit.x === x && exit.y === y) {
        cell.textContent = "◌";
      }

      maze.appendChild(cell);
    }
  }
}

function move(dx, dy) {
  player.x = Math.max(0, Math.min(size - 1, player.x + dx));
  player.y = Math.max(0, Math.min(size - 1, player.y + dy));
  steps++;

  if (sigil && player.x === sigil.x && player.y === sigil.y) {
    sigil = null;
    statusText.textContent = "Something unlocks elsewhere.";
  }

  if (!sigil && player.x === exit.x && player.y === exit.y) {
    statusText.textContent = "The air changes. You are no longer trapped.";
  }

  if (steps % 3 === 0 && sigil) {
    sigil.x = Math.floor(Math.random() * size);
    sigil.y = Math.floor(Math.random() * size);
  }

  draw();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

draw();
