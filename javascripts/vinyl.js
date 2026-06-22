const recordsData = [
  {
    src: "images/vinylblue.svg",
    title: "(НОЧЬ)",
    subtitle: "пластинка",
    price: "10.000 руб"
  },
  {
    src: "images/vinylpurple.svg",
    title: "(НЕОН)",
    subtitle: "пластинка",
    price: "11.000 руб"
  },
  {
    src: "images/vinylyellow.svg",
    title: "(AFTERS)",
    subtitle: "пластинка",
    price: "12.000 руб"
  },
  {
    src: "images/vinylgreen.svg",
    title: "(LAST CALL)",
    subtitle: "пластинка",
    price: "11.200 руб"
  },
  {
    src: "images/vinylpink.svg",
    title: "(ДЫМ)",
    subtitle: "пластинка",
    price: "15.000 руб"
  }
];

let activeIndex = 0;

const container = document.getElementById("recordsContainer");
const info = document.getElementById("recordInfo");

const recordElements = [];

function createRecords() {
  recordsData.forEach(function(record, index) {
    const img = document.createElement("img");

    img.src = record.src;
    img.alt = record.title;
    img.className = "record";

    img.addEventListener("click", function() {
      const offset = getOffset(index);

      if (offset === -1) moveLeft();
      if (offset === 1) moveRight();
    });

    container.appendChild(img);
    recordElements.push(img);
  });
}

function getOffset(index) {
  let offset = index - activeIndex;

  if (offset > recordsData.length / 2) {
    offset -= recordsData.length;
  }

  if (offset < -recordsData.length / 2) {
    offset += recordsData.length;
  }

  return offset;
}

function updateRecords() {
  recordElements.forEach(function(img, index) {
    img.className = "record";

    const offset = getOffset(index);

    if (offset === 0) {
      img.classList.add("pos-0");
    } else if (offset === -1) {
      img.classList.add("pos-left");
    } else if (offset === 1) {
      img.classList.add("pos-right");
    } else if (offset < -1) {
      img.classList.add("pos-far-left");
    } else if (offset > 1) {
      img.classList.add("pos-far-right");
    }
  });

  const active = recordsData[activeIndex];

  info.innerHTML = `
    <h2 class="record-title">${active.title}</h2>
    <h2 class="record-title">${active.subtitle}</h2>
    <p class="record-price">${active.price}</p>
  `;
}

function moveLeft() {
  activeIndex--;

  if (activeIndex < 0) {
    activeIndex = recordsData.length - 1;
  }

  updateRecords();
}

function moveRight() {
  activeIndex++;

  if (activeIndex >= recordsData.length) {
    activeIndex = 0;
  }

  updateRecords();
}

document.querySelector(".prev").addEventListener("click", moveLeft);
document.querySelector(".next").addEventListener("click", moveRight);

createRecords();
updateRecords();

// === КАСТОМНЫЙ ВИДЕОПЛЕЕР ===
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('vinylVideo');
    if (!video) return;

    const centerBtn = document.getElementById('centerBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const pauseIcon2 = document.getElementById('pauseIcon2');
    const progressFill = document.getElementById('progressFill');
    const progressTrack = document.querySelector('.progress-track');

    // === ПЕРЕКЛЮЧЕНИЕ ИКОНОК ===
    function setIcon(mode) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'none';
        pauseIcon2.style.display = 'none';

        if (mode === 'play') {
            playIcon.style.display = 'block';
        } else if (mode === 'pause') {
            pauseIcon.style.display = 'block';
            pauseIcon2.style.display = 'block';
        }
    }

    // Стартовое состояние — Play
    setIcon('play');

    // === ОБНОВЛЕНИЕ ПРОГРЕССА ===
    function updateProgress() {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressFill.style.width = percent + '%';
        }
    }

    // === КЛИК ПО ЦЕНТРАЛЬНОЙ КНОПКЕ ===
    centerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (video.paused) {
            video.play();
            setIcon('pause');
        } else {
            video.pause();
            setIcon('play');
        }
    });

    // === КЛИК ПО САМОМУ ВИДЕО ===
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            setIcon('pause');
        } else {
            video.pause();
            setIcon('play');
        }
    });

    // === КЛИК ПО ПОЛОСЕ ПРОГРЕССА (ПЕРЕМОТКА) ===
    progressTrack.addEventListener('click', function(e) {
        const rect = progressTrack.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = Math.max(0, Math.min(1, clickX / width));
        video.currentTime = percent * video.duration;
        updateProgress();
    });

    // === ОБНОВЛЕНИЕ ПРОГРЕССА ВО ВРЕМЯ ВОСПРОИЗВЕДЕНИЯ ===
    video.addEventListener('timeupdate', updateProgress);

    // === КОГДА ВИДЕО ЗАКОНЧИЛОСЬ ===
    video.addEventListener('ended', function() {
        setIcon('play');
        progressFill.style.width = '0%';
        video.currentTime = 0;
    });

    // === ПРИ ЗАГРУЗКЕ ДАННЫХ ===
    video.addEventListener('loadedmetadata', function() {
        updateProgress();
    });

    // === АВТОЗАПУСК С MUTED ===
    video.muted = true;
    video.play().then(() => {
        setIcon('pause');
    }).catch(() => {
        setIcon('play');
    });
});
