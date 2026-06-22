const world = document.getElementById("world");

let x = 0;
let y = 0;

// движение поля за мышкой
document.addEventListener("mousemove", (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  x = -dx * 230;
  y = -dy * 230;

  world.style.transform = `translate(${x}px, ${y}px)`;
});


// ======================
//  ГЛОБАЛЬНЫЙ ЗВУК
// ======================

let isMuted = false;

const soundToggle = document.getElementById("soundToggle");
const soundIcon = document.getElementById("soundIcon");


// ======================
//  ПЛЕЕР
// ======================

const players = {};

class MiniPlayer {
  constructor(modal) {
    this.modal = modal;

    this.audio = new Audio();
    this.audio.muted = isMuted;

    this.tracks = [];
    this.currentIndex = 0;
    this.isPlaying = false;

    this.playBtn = modal.querySelector(".cover-play-btn");
    this.playIcon = modal.querySelector(".play-icon");
    this.stopIcon = modal.querySelector(".stop-icon");
    this.progressFill = modal.querySelector(".progress-fill");
    this.progressBar = modal.querySelector(".progress");
    this.trackItems = modal.querySelectorAll(".track-item");

    this.tracks = Array.from(this.trackItems);

    this.playBtn.addEventListener("click", () => this.togglePlay());

    this.progressBar.addEventListener("click", (e) => {
      if (!this.audio.duration) return;

      const rect = this.progressBar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;

      this.audio.currentTime = percent * this.audio.duration;
    });

    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio.duration) return;

      const pct = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressFill.style.width = pct + "%";
    });

    this.audio.addEventListener("ended", () => {
      this.isPlaying = false;

      this.playIcon.style.display = "block";
      this.stopIcon.style.display = "none";

      this.trackItems[this.currentIndex].classList.remove("playing");
      this.progressFill.style.width = "0%";
    });

    this.trackItems.forEach((item, index) => {
      item.addEventListener("click", () => this.playTrack(index));
    });

    if (this.tracks.length > 0) {
      this.loadTrack(0);
    }
  }

  loadTrack(index) {
    this.trackItems.forEach((track) => {
      track.classList.remove("active", "playing");
    });

    this.currentIndex = index;
    this.trackItems[index].classList.add("active");

    const src = this.tracks[index].dataset.src;

    this.audio.src = src;
    this.audio.load();

    this.progressFill.style.width = "0%";
  }

  playTrack(index) {
    if (this.currentIndex === index && this.isPlaying) {
      this.pause();
      return;
    }

    if (this.currentIndex !== index) {
      this.loadTrack(index);
    }

    this.play();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.play();

    this.isPlaying = true;

    this.playIcon.style.display = "block";
this.stopIcon.style.display = "none";

    this.trackItems[this.currentIndex].classList.add("playing");
  }

  pause() {
    this.audio.pause();

    this.isPlaying = false;

    this.playIcon.style.display = "none";
    this.stopIcon.style.display = "block";

    this.trackItems[this.currentIndex].classList.remove("playing");
  }
}


// ======================
//  МОДАЛКИ
// ======================

const tiles = document.querySelectorAll(".tile");
const modals = document.querySelectorAll(".modal");

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const id = tile.dataset.modal;
    const modal = document.getElementById(id);

    modal.style.display = "flex";

    if (!players[id]) {
      players[id] = new MiniPlayer(modal);
    }
  });
});

modals.forEach((modal) => {
  const btn = modal.querySelector(".close-btn");

  btn.addEventListener("click", () => {
    modal.style.display = "none";

    if (players[modal.id]) {
      players[modal.id].pause();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";

      if (players[modal.id]) {
        players[modal.id].pause();
      }
    }
  });
});


// ======================
//  КНОПКА ЗВУКА
// ======================

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    isMuted = !isMuted;

    Object.values(players).forEach((player) => {
      player.audio.muted = isMuted;
    });

    if (isMuted) {
      soundIcon.src = "images/SpeakerX.svg";
    } else {
      soundIcon.src = "images/SpeakerHigh.svg";
    }
  });
}