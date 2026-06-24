const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const scrambleSelectors = [
  ".mainMenu a:not(:has(img))",

  ".contacts-column h3",
  ".contacts-column p",
  ".contacts-footer span",

  ".container404 p",

  ".record-title",
  ".record-price",

  ".drink-name",
  ".drink-type",
  ".drink-price",

  ".nadpis1",
  ".nadpis2",
  ".bar-map-title",
  ".bar-map-address"
];

const initialized = new WeakSet();

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function animateScramble(el) {
  const original = el.dataset.originalText;
  let frame = 0;
  const duration = 45;
  cancelAnimationFrame(el.scrambleAnimation);

  function update() {
    let output = "";

    for (let i = 0; i < original.length; i++) {
      const symbol = original[i];

      if (symbol === " " || symbol === "\n") {
        output += symbol;
        continue;
      }

      const start = i * 1.4;
      const end = start + 18;

      if (frame < start) {
        output += symbol;
      } else if (frame < end) {
        output += randomChar();
      } else {
        output += symbol;
      }
    }

    el.textContent = output;
    frame++;

    if (frame < duration + original.length * 1.4) {
      el.scrambleAnimation = requestAnimationFrame(update);
    } else {
      el.textContent = original;
    }
  }

  update();
}

function initScramble() {
  scrambleSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (initialized.has(el)) return;
      if (!el.textContent.trim()) return;

      initialized.add(el);
      el.dataset.originalText = el.textContent;

      el.addEventListener("mouseenter", () => {
        animateScramble(el);
      });

      el.addEventListener("mouseleave", () => {
        cancelAnimationFrame(el.scrambleAnimation);
        el.textContent = el.dataset.originalText;
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 390) return;
  
    initScramble();

  const observer = new MutationObserver(() => {
    initScramble();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});