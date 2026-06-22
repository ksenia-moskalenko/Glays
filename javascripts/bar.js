// ============================================================
// ===== ДАННЫЕ НАПИТКОВ =====
// ============================================================
const drinksData = [
    { src: "images/stakan1.svg", name: "(VINYL)", type: "шот", price: "560 руб" },
    { src: "images/stakan2.svg", name: "(НОЧЬ)", type: "коктель", price: "560 руб" },
    { src: "images/stakan3.svg", name: "(NEON)", type: "коктель", price: "560 руб" },
    { src: "images/stakan4.svg", name: "(AFTERS)", type: "шот", price: "560 руб" },
  ];
  
  // ============================================================
  // ===== КАРУСЕЛЬ =====
  // ============================================================
  let activeDrinkIndex = 0;
  const drinksContainer = document.getElementById("drinksContainer");
  const drinkInfo = document.getElementById("drinkInfo");
  const drinkElements = [];
  
  function createDrinks() {
    drinksData.forEach(function(drink, index) {
      const img = document.createElement("img");
      img.src = drink.src;
      img.alt = drink.name;
      img.className = "drink";
  
      img.addEventListener("click", function() {
        const offset = getDrinkOffset(index);
        if (offset === -1) slideDrinkLeft();
        if (offset === 1) slideDrinkRight();
      });
  
      drinksContainer.appendChild(img);
      drinkElements.push(img);
    });
  }
  
  function getDrinkOffset(index) {
    let offset = index - activeDrinkIndex;
    if (offset > drinksData.length / 2) offset -= drinksData.length;
    if (offset < -drinksData.length / 2) offset += drinksData.length;
    return offset;
  }
  
  function updateDrinks() {
    drinkElements.forEach(function(img, index) {
      img.className = "drink";
      const offset = getDrinkOffset(index);
  
      if (offset === 0) img.classList.add("pos-center");
      else if (offset === -1) img.classList.add("pos-left");
      else if (offset === 1) img.classList.add("pos-right");
      else if (offset < -1) img.classList.add("pos-far-left");
      else if (offset > 1) img.classList.add("pos-far-right");
    });
  
    const activeDrink = drinksData[activeDrinkIndex];
    drinkInfo.innerHTML = `
      <h2 class="drink-name">${activeDrink.name}</h2>
      <h2 class="drink-type">${activeDrink.type}</h2>
      <p class="drink-price">${activeDrink.price}</p>
    `;
  }
  
  function slideDrinkLeft() {
    activeDrinkIndex--;
    if (activeDrinkIndex < 0) activeDrinkIndex = drinksData.length - 1;
    updateDrinks();
  }
  
  function slideDrinkRight() {
    activeDrinkIndex++;
    if (activeDrinkIndex >= drinksData.length) activeDrinkIndex = 0;
    updateDrinks();
  }
  
  // ===== ЗАПУСК КАРУСЕЛИ =====
  function initCarousel() {
    if (drinksContainer && drinkInfo) {
      const prevBtn = document.querySelector(".drink-prev");
      const nextBtn = document.querySelector(".drink-next");
      
      if (prevBtn) prevBtn.addEventListener("click", slideDrinkLeft);
      if (nextBtn) nextBtn.addEventListener("click", slideDrinkRight);
      
      createDrinks();
      updateDrinks();
    }
  }
  
  // Автозапуск при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
  // курсор
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});