const errorBlobs = document.querySelectorAll(".error-blob");

function moveErrorBlobs(event) {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  errorBlobs.forEach(function(blob, i) {
    const speed = 25 + i * 10;

    blob.style.translate =
      `${x * speed}px ${y * speed}px`;
  });
}

document.addEventListener("mousemove", moveErrorBlobs);

// курсор
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});