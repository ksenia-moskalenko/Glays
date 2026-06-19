// курсор
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});



// цветные кусочки
const blobs = document.querySelectorAll(".blob, .color");

function moveBlobs(event) {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  blobs.forEach(function (blob, i) {
    const speed = 12 + i * 3;

    blob.style.setProperty("--x", x * speed + "px");
    blob.style.setProperty("--y", y * speed + "px");
  });
}

document.addEventListener("mousemove", moveBlobs);

// картинка двигается


// текст летит

const text = document.querySelector(".text2");
const letters = text.textContent.split("");

text.innerHTML = "";

letters.forEach(function(letter) {
  const span = document.createElement("span");
  span.textContent = letter;

  const x = (Math.random() - 0.5) * 120;
  const y = (Math.random() - 0.5) * 120;
  const r = (Math.random() - 0.5) * 40;

  span.style.setProperty("--x", x + "px");
  span.style.setProperty("--y", y + "px");
  span.style.setProperty("--r", r + "deg");

  text.appendChild(span);
});

// карточки скрол
const cards = document.querySelectorAll(".project-card");

function animateCards() {
  cards.forEach(function(card) {
    const step = card.parentElement;
    const rect = step.getBoundingClientRect();

    let progress = (300 - rect.top) / (window.innerHeight * 0.9);

    progress = Math.max(0, Math.min(progress, 1));

    if (progress < 0.6) {
      progress = 0;
    } else {
      progress = (progress - 0.6) / 0.4;
    }

    const scale = 1 - progress * 0.07;
    const translateY = progress * -45;

    card.style.transform =
      `translateY(${translateY}px) scale(${scale})`;
  });
}

window.addEventListener("scroll", animateCards);
animateCards();

// вылетает увед
function contactsSubscribe() {

  const button = document.querySelector(".send-btn");
  const input = document.querySelector('input[name="email"]');

  button.addEventListener("click", function(event) {

    event.preventDefault();

    const email = input.value.trim();

    if (email === "") {

      alert("Введите электронную почту");

    } else {

      alert("Спасибо за подписку!");

      input.value = "";
    }

  });

}

contactsSubscribe();

// слово контакты
const contactsTitle =
    document.querySelector(".contacts-title");

const contactsSection =
    document.querySelector(".contacts");

function animateContacts() {

    const rect =
        contactsSection.getBoundingClientRect();

    let progress =
        (window.innerHeight - rect.top) /
        window.innerHeight;

    progress = Math.max(
        0,
        Math.min(progress, 1)
    );


    const scale = 0.08 + progress * 0.92;

    contactsTitle.style.transform =
        `scaleY(${scale})`;
}

window.addEventListener(
    "scroll",
    animateContacts
);

animateContacts();


// магазин
// пластинки переезжают
