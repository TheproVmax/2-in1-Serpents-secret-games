// Built slowly. Mistakes included.

const maze = document.getElementById("maze");
const statusText = document.getElementById("status");

let level = 1;
let size = 9;
let cellSize = 52;
let steps = 0;

let player, sigil, exit;

function setupLevel() {
  steps = 0;
  size = 7 + level * 2;

  player = { x: 0, y: 0 };
  sigil = { x: size - 3, y: size - 3 };
  exit = { x: size - 1, y: size - 1 };

  maze.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
  maze.style.border = "2px solid #3a2a18";
  maze.style.padding = "6px";
  maze.style.backgroundColor = "#1a120b";

  statusText.textContent = `Labyrinth Level ${level}`;
  draw();
}

function draw() {
  maze.innerHTML = "";

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement("div");
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.display = "flex";
      cell.style.alignItems = "center";
      cell.style.justifyContent = "center";
      cell.style.fontSize = "1.3rem";
      cell.style.backgroundColor = "#24180f";

      if (player.x === x && player.y === y) {
        cell.textContent = "✦";
        cell.style.color = "#f2d48f";
        cell.style.boxShadow = "0 0 10px rgba(242,212,143,0.6)";
      } 
      else if (sigil && sigil.x === x && sigil.y === y) {
        cell.textContent = "●";
        cell.style.color = "#c79a3d";
      } 
      else if (!sigil && exit.x === x && exit.y === y) {
        cell.textContent = "◌";
        cell.style.color = "#9fd3c7";
      }

      maze.appendChild(cell);
    }
  }
}

function move(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;

  if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;

  player.x = nx;
  player.y = ny;
  steps++;

  if (sigil && player.x === sigil.x && player.y === sigil.y) {
    sigil = null;
    statusText.textContent = "The maze loosens its grip.";
  }

  if (!sigil && player.x === exit.x && player.y === exit.y) {
    level++;
    if (level > 4) {
      statusText.textContent =
        "You have passed every turning of the Labyrinth.";
      return;
    }
    setupLevel();
    return;
  }

  if (steps % 4 === 0 && sigil) {
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

setupLevel();
