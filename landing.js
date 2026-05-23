
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const playBtn = document.getElementById("playBtn");

window.GameState = {
  player1: localStorage.getItem("player1") || "",
  player2: localStorage.getItem("player2") || ""
};

function validateInputs() {
  const p1 = player1.value.trim();
  const p2 = player2.value.trim();

  if (p1 && p2) {
    playBtn.disabled = false;
    playBtn.textContent = "Play Game";
  } else {
    playBtn.disabled = true;
    playBtn.textContent = "Enter Names to Play";
  }
}

// listen for typing
player1.addEventListener("input", validateInputs);
player2.addEventListener("input", validateInputs);

function startGame(mode) {
  const p1 = player1.value.trim();
  const p2 = player2.value.trim();


  if (!p1 || !p2) return;

  // also persist across pages (important)
  
  sessionStorage.setItem("player1", p1);
  sessionStorage.setItem("player2", p2);

  console.log("Saved:", p1, p2);

  
  // small delay ensures storage commits before navigation
  setTimeout(() => {
    window.location.href = "game.html";
  }, 90);
}

// reset button to clear saved names
window.addEventListener("load", () => {
  const savedP1 = sessionStorage.getItem("player1");
  const savedP2 = sessionStorage.getItem("player2");

  // input elements
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");
  const resetBtn = document.getElementById("resetBtn");

  // if nothing stored → ensure inputs are empty
  if (!savedP1 && !savedP2) {
    player1.value = "";
    player2.value = "";
  } else {
    // optional: preload saved values
    player1.value = savedP1 || "";
    player2.value = savedP2 || "";
    validateInputs(); // enable play button if valid
  }

  // reset button behavior
  resetBtn.addEventListener("click", () => {
    sessionStorage.removeItem("player1");
    sessionStorage.removeItem("player2");

    player1.value = "";
    player2.value = "";

    playBtn.disabled = true;
    playBtn.textContent = "Enter Names to Play";

    console.log("Player names cleared");
  });
});

      // GSAP intro animation
 window.addEventListener("load", () => {
    const container = document.querySelector(".xo-anim");
    const symbols = ["X", "O"];

    // Create floating X/O elements
    for (let i = 0; i < 10; i++) {
      const el = document.createElement("div");
      el.classList.add("xo");
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

      // random position
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 40 + "px";

      container.appendChild(el);

      // drop in animation
      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: "back.out(2)"
      });

      // breathing loop
      gsap.to(el, {
        scale: 1.4,
        duration: 1.2 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1 + i * 0.05
      });
    }
  });

//   ribbon animation
window.addEventListener("load", () => {
  const ribbon = document.querySelector(".top-xo-ribbon");
  const symbols = ["X", "O"];

  for (let i = 0; i < 25; i++) {
    const el = document.createElement("div");
    el.classList.add("top-xo");
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];

    // spread across full width
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 120 + "px";

    ribbon.appendChild(el);

    // entrance animation
    gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      delay: i * 0.05,
      ease: "back.out(2)"
    });

    // floating drift + breathing
    gsap.to(el, {
      y: "+=20",
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(el, {
      scale: 1.4,
      duration: 1.5 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
});

// footer animation
window.addEventListener("load", () => {
  const grid = document.querySelector(".grid-footer");

  // smooth horizontal + vertical wave motion
  gsap.to(grid, {
    backgroundPositionX: "+=40",
    backgroundPositionY: "+=20",
    duration: 6,
    repeat: -1,
    ease: "sine.inOut",
    yoyo: true
  });

  // slow breathing intensity (feels like energy flowing)
  gsap.to(grid, {
    opacity: 0.85,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
});