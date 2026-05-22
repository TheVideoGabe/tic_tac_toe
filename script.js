// GSAP Scramble Text Animation for Game Title
const tl = gsap.timeline({
  id: "text-scramble",
  defaults: { ease: "none" }
});

const cursorTl = gsap.timeline({ repeat: -1 });

gsap.set("#game-title", {
//   opacity: 100
});

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
    text: "XOXO",
    fontweight: "bold",
    chars: "01",
    speed: 0.1,
  },
  duration: 1
})
  .to("#scramble-text-2", {
    scrambleText: {
      text: "XOXO ",
      fontweight: "bold",
      chars: "01",
      speed: 0.2
    },
    duration: 1
  })
  .to("#scramble-text-3", {
    scrambleText: {
        text: "XOXO",
        fontweight: "bold",
        chars: "01" },
            duration: 1
  })
  .to("#scramble-text-4", {
    scrambleText: { text: "XOXO", chars: "01", speed: 0.3 },
    duration: 1
  })
  .add(cursorTl);

window.onclick = () => tl.play(.1); // click to replay

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
    text: "Welcome to Tic Tac Toe!",
    fontWeight: "bold",
    fontStyle: "Courier New",
    duration: 2,
    ease: "power1.inOut",
    delay: 4
});

// End of Animations

