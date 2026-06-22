const scrambleSymbols = "!@#$%^&*()_+-=[]{}<>?/|";
const animatedTextElements = new WeakSet();

const scrambleSelectors = [
  ".mainMenu a",
  ".text1",

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

function randomSymbol() {
  return scrambleSymbols[Math.floor(Math.random() * scrambleSymbols.length)];
}

function scrambleText(text, progress) {
  return text
    .split("")
    .map((char, index) => {
      if (char === " " || char === "\n" || char === "\t") return char;
      return Math.random() < progress ? randomSymbol() : char;
    })
    .join("");
}

function addScrambleEffect(element) {
  if (!element) return;
  if (animatedTextElements.has(element)) return;

  const originalText = element.textContent;
  if (!originalText || originalText.trim() === "") return;

  animatedTextElements.add(element);

  let interval = null;

  element.addEventListener("mouseenter", () => {
    let progress = 1;

    clearInterval(interval);

    interval = setInterval(() => {
      element.textContent = scrambleText(originalText, progress);
    }, 45);
  });

  element.addEventListener("mouseleave", () => {
    clearInterval(interval);
    element.textContent = originalText;
  });
}

function initScrambleText() {
  scrambleSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.querySelector("img")) return;
      addScrambleEffect(element);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initScrambleText();

  const observer = new MutationObserver(() => {
    initScrambleText();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});