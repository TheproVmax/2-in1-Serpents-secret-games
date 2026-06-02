// Built slowly. Mistakes included.

const maze = document.getElementById("maze");
const statusText = document.getElementById("status");

/* ---- MAZE SIZE ---- */
const size = 11;        // BIGGER GRID
const cellSize = 52;    // BIGGER CELLS

let player = { x: 0, y: 0 };
let sigil = { x: 8, y: 8 };
let exit = { x: 10, y: 10 };
let steps = 0;

/* ---- MAZE STYLING ---- */
maze.style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
maze.style.border = "2px solid #3a2a18";
maze.style.padding = "6px";
maze.style.backgroundColor = "#1a120b";

/* ---- DRAW MAZE ---- */
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

/* ---- MOVEMENT ---- */
function move(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (newX < 0 || newX >= size || newY < 0 || newY >= size) return;

  player.x = newX;
  player.y = newY;
  steps++;

  if (sigil && player.x === sigil.x && player.y === sigil.y) {
    sigil = null;
    statusText.textContent = "Something unlocks elsewhere.";
  }

  if (!sigil && player.x === exit.x && player.y === exit.y) {
    statusText.textContent = "The air changes. You are no longer trapped.";
  }

  if (steps % 4 === 0 && sigil) {
    sigil.x = Math.floor(Math.random() * size);
    sigil.y = Math.floor(Math.random() * size);
  }

  draw();
}

/* ---- CONTROLS ---- */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

/* ---- START ---- */
draw();
