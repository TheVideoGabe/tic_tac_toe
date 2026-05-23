// Initilize game Objects
const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

const winQuotes = [
  "Victory is yours! 🏆",
  "Well played!",
  "Too Easy! 😎",
  "GG! 👏",
  "Tic Tac Toe Mogged 'em! 💀",
  "Insert Brain Rot Here",
  "Victory Royale! 🥇",
  "Suck it... I mean, good game! 😅",
];

const drawQuotes = [
  "It's a Draw! 🤝",
  "So close! 😬",
  "Stop copying me! 😤",
  "I never wanted to win anyway... 😢",
  "I can do this all day! 😎",
  "Honey, it was ruined when she bought it... 🖌️🐱🎩",
  "It's a tie! Let's call it a truce! 🕊️",
  "I'm not calling you a liar but... I'm not calling you a truther ˙𐃷˙",
];

resetGame = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        gameBoard[i][j] = "";
        const index = i * 3 + j;
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        if (cell) {
            cell.textContent = "";
            cell.classList.remove("x-player", "o-player");
        }
    }
  }
    game.isGameOver = false;
    game.winner = null;
    game.currentPlayerIndex = 0;
    document.getElementById("board").style.pointerEvents = "auto";
}

class Player {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.scores = 0;
  }
}

const player1 = new Player(sessionStorage.getItem("player1"), "X", 0);
const player2 = new Player(sessionStorage.getItem("player2"), "O", 0);

// function to fill in interiorcells with circles and crosses
function fillCell(row, col, symbol) {
  const index = row * 3 + col;

  const cell = document.querySelector(
    `.cell[data-index="${index}"]`
  );

  if (cell) {
    cell.textContent = symbol;
  }
   // Add styling class
    if (symbol === "X") {
      cell.classList.add("x-player");
    } else {
      cell.classList.add("o-player");
    }
}

const game = {
  board: gameBoard,
  players: [player1, player2],
  currentPlayerIndex: 0,
  isGameOver: false,
  winner: null,

    makeMove(row, col) {
    if (this.isGameOver || this.board[row][col] !== "") {
      return false;
    }
    this.board[row][col] = this.players[this.currentPlayerIndex].symbol;
    if (this.checkWin()) {
      this.isGameOver = true;
      this.winner = this.players[this.currentPlayerIndex];
    } else if (this.checkDraw()) {
      this.isGameOver = true;
    } else {
      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }
    return true;
    },

    checkWin() {
    const symbol = this.players[this.currentPlayerIndex].symbol;
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === symbol && this.board[i][1] === symbol && this.board[i][2] === symbol) {
        return true;
        }
        if (this.board[0][i] === symbol && this.board[1][i] === symbol && this.board[2][i] === symbol) {
        return true;
        }
    }
    if (this.board[0][0] === symbol && this.board[1][1] === symbol && this.board[2][2] === symbol) {
      return true;
    }
    if (this.board[0][2] === symbol && this.board[1][1] === symbol && this.board[2][0] === symbol) {
      return true;
    }
    return false;
    },

    checkDraw() {
    return this.board.flat().every(cell => cell !== "");
    }
};

// Event Listeners for Game Interaction
const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = Number(cell.dataset.index);

    // Convert 0-8 index into row/col
    const row = Math.floor(index / 3);
    const col = index % 3;

    // Get current player symbol BEFORE move changes turn
    const currentSymbol =
      game.players[game.currentPlayerIndex].symbol;

    const moveMade = game.makeMove(row, col);

    if (moveMade) {
      fillCell(row, col, currentSymbol);
    }

    if (game.winner) {
        setTimeout(() => {
            updateScore(game.winner.symbol);
            showWinModal(game.winner.name, game.winner.symbol);
        }, 500);
    document.getElementById("board").style.pointerEvents = "none";
} else if (game.isGameOver) {
    setTimeout(() => {
        showDrawModal();
    }, 500);
    document.getElementById("board").style.pointerEvents = "none";
    }
  });
});

let p1Name = sessionStorage.getItem("player1") || "Player 1";
let p2Name = sessionStorage.getItem("player2") || "Player 2";

document.getElementById("p1Name").textContent = p1Name;
document.getElementById("p2Name").textContent = p2Name;

document.getElementById("p1Score").textContent = player1.scores;
document.getElementById("p2Score").textContent = player2.scores;

function updateScore(winner) {
  if (winner === "X") {
    player1.scores++;
  } else if (winner === "O") {
    player2.scores++;
  }

  document.getElementById("p1Score").textContent = player1.scores;
  document.getElementById("p2Score").textContent = player2.scores;
}

// GSAP Scramble Text Animation for Game Title
const tl = gsap.timeline({
  id: "text-scramble",
  defaults: { ease: "none" }
});

const cursorTl = gsap.timeline({ repeat: -1 });

cursorTl
  .to("#scramble-cursor", {
    opacity: 100,
    duration: 0.5,
    ease: "none",
    delay: 0.2
  })
  .to("#scramble-cursor", {
    opacity: 100,
    duration: 0.5,
    ease: "none",
    delay: 0.2
  });

tl.to("#scramble-text-1", {
  scrambleText: {
    text: "OXO",
    fontweight: "bold",
    chars: "01",
    speed: 0.1,
  },
  duration: 1
})
  .to("#scramble-text-2", {
    scrambleText: {
      text: "OXO",
      fontweight: "bold",
      chars: "01",
      speed: 0.2
    },
    duration: 1
  })
  .to("#scramble-text-3", {
    scrambleText: {
        text: "XOX",
        fontweight: "bold",
        chars: "01" },
            duration: 1
  })
  .to("#scramble-text-4", {
    scrambleText: { text: "XOX", chars: "01", speed: 0.3 },
    duration: 1
  })
  .add(cursorTl);

// GSAP Split Text Animation for Game Title
const split = new SplitText("#game-title", { type: "chars" });
const chars = split.chars;
gsap.set(chars, { opacity: 0, y: 50 });

gsap.to(chars, {
    opacity: 100,
    y: 0,
    duration: 1,
    ease: "back.out",
    stagger: 0.1,
    delay: 1
});

// GSAP Text Plugin Animation for Game Title
gsap.to("#game-title", {
    text: "TIC TAC TOE",
    fontWeight: "bold",
    fontStyle: "Courier New",
    duration: 2,
    ease: "power1.inOut",
    delay: 4
});

// End of Animations

// console.log(p1, p2);

window.addEventListener("load", () => {
  const p1 = sessionStorage.getItem("player1");
  const p2 = sessionStorage.getItem("player2");

  console.log("Loaded players:", p1, p2);

  if (!p1 || !p2) {
    console.warn("No player data found — redirecting back");
    window.location.href = "index.html"; // or landing page if needed
  }
});

// bootstrap modal
const winModal = new bootstrap.Modal(document.getElementById("winModal"));
const winText = document.getElementById("winText");
const winBody = document.getElementById("winMessage");
const playAgainBtn = document.getElementById("playAgainBtn");



function showWinModal(winnerName, symbol) {
  winText.textContent = `${winnerName} Wins!`;

  playAgainBtn.classList.remove("x-theme", "o-theme", "draw-theme");

  if (symbol === "X") {
    playAgainBtn.classList.add("x-theme");
  } 
  else if (symbol === "O") {
    playAgainBtn.classList.add("o-theme");
  } 
  else {
    playAgainBtn.classList.add("draw-theme");
  }
const randomQuote = winQuotes[Math.floor(Math.random() * winQuotes.length)];

winBody.textContent = `${randomQuote}`;
  winModal.show();
}

function showDrawModal() {
  winText.textContent = "It's a Draw!";
  playAgainBtn.classList.remove("x-theme", "o-theme", "draw-theme");
  playAgainBtn.classList.add("draw-theme");
  const randomQuote = drawQuotes[Math.floor(Math.random() * drawQuotes.length)];
  winBody.textContent = `${randomQuote}`;
  winModal.show();
}

playAgainBtn.addEventListener("click", () => {
  winModal.hide();
  resetGame();
});

// Clear player names from sessionStorage and reset input fields
const exitBtn = document.getElementById("exitBtn");

exitBtn.addEventListener("click", () => {
  sessionStorage.removeItem("player1");
  sessionStorage.removeItem("player2");
  window.location.href = "index.html";
});

