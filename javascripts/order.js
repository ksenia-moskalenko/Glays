// Ждем полной загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Получаем главное изображение
  const mainImage = document.getElementById("mainImage");
  if (!mainImage) {
    console.error("mainImage не найден!");
    return;
  }

  // Объект со всеми изображениями
  const images = {
    purp: {
      base1: "images/plastinkaPurp1.png",
      base2: "images/plastinkaPurp2.png",
      base3: "images/plastinkaPurp3.png",
    },
    pink: {
      base1: "images/plastinkaPink1.png",
      base2: "images/plastinkaPink2.png",
      base3: "images/plastinkaPink3.png",
    },
    yellow: {
      base1: "images/plastinkaYel1.png",
      base2: "images/plastinkaYel2.png",
      base3: "images/plastinkaYel3.png",
    },
    green: {
      base1: "images/plastinkaGreen1.png",
      base2: "images/plastinkaGreen2.png",
      base3: "images/plastinkaGreen3.png",
    },
    blue: {
      base1: "images/plastinkaBlue1.png",
      base2: "images/plastinkaBlue2.png",
      base3: "images/plastinkaBlue3.png",
    },
  };

  // Текущие значения
  let currentColor = "purp";
  let currentBase = "base1";

  // Функция обновления изображения
  function updateImage() {
    const newSrc = images[currentColor][currentBase];
    console.log("Меняем на:", newSrc);
    mainImage.src = newSrc;
  }

  // Находим все кружки с цветами
  const colorKrug1 = document.querySelector(".krug-krug1");
  const colorKrug2 = document.querySelector(".krug-krug2");
  const colorKrug3 = document.querySelector(".krug-krug3");
  const colorKrug4 = document.querySelector(".krug-krug4");
  const colorKrug5 = document.querySelector(".krug-krug5");

  // Находим все базы
  const backBace1 = document.querySelector(".back-bace1");
  const backBace2 = document.querySelector(".back-bace2");
  const backBace3 = document.querySelector(".back-bace3");

  // Проверяем, что все элементы найдены
  console.log("Элементы найдены:", {
    mainImage: !!mainImage,
    colorKrug1: !!colorKrug1,
    colorKrug2: !!colorKrug2,
    colorKrug3: !!colorKrug3,
    colorKrug4: !!colorKrug4,
    colorKrug5: !!colorKrug5,
    backBace1: !!backBace1,
    backBace2: !!backBace2,
    backBace3: !!backBace3,
  });

  // Добавляем обработчики для цветов с проверкой
  if (colorKrug1) {
    colorKrug1.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по фиолетовому");
      currentColor = "purp";
      updateImage();
    });
    // Делаем элемент кликабельным
    colorKrug1.style.pointerEvents = "auto";
    colorKrug1.style.cursor = "pointer";
  }

  if (colorKrug2) {
    colorKrug2.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по розовому");
      currentColor = "pink";
      updateImage();
    });
    colorKrug2.style.pointerEvents = "auto";
    colorKrug2.style.cursor = "pointer";
  }

  if (colorKrug3) {
    colorKrug3.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по желтому");
      currentColor = "yellow";
      updateImage();
    });
    colorKrug3.style.pointerEvents = "auto";
    colorKrug3.style.cursor = "pointer";
  }

  if (colorKrug4) {
    colorKrug4.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по зеленому");
      currentColor = "green";
      updateImage();
    });
    colorKrug4.style.pointerEvents = "auto";
    colorKrug4.style.cursor = "pointer";
  }

  if (colorKrug5) {
    colorKrug5.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по голубому");
      currentColor = "blue";
      updateImage();
    });
    colorKrug5.style.pointerEvents = "auto";
    colorKrug5.style.cursor = "pointer";
  }

  // Добавляем обработчики для баз
  if (backBace1) {
    backBace1.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по базе 1");
      currentBase = "base1";
      updateImage();
    });
    backBace1.style.pointerEvents = "auto";
    backBace1.style.cursor = "pointer";
  }

  if (backBace2) {
    backBace2.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по базе 2");
      currentBase = "base2";
      updateImage();
    });
    backBace2.style.pointerEvents = "auto";
    backBace2.style.cursor = "pointer";
  }

  if (backBace3) {
    backBace3.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Клик по базе 3");
      currentBase = "base3";
      updateImage();
    });
    backBace3.style.pointerEvents = "auto";
    backBace3.style.cursor = "pointer";
  }

  // Устанавливаем начальное изображение
  updateImage();

  console.log("Скрипт загружен и готов к работе");
});
