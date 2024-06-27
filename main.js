const container = document.querySelector(".container");
const btnOptionValue = document.querySelectorAll("button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
let isStop = false;

// fungsi untuk membaca teks
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  speechSynthesis.speak(utterance);
}

btnOptionValue.forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    // ambil lebar dan tinggi elemen
    const btnWidthYes = btn.offsetWidth;
    const btnHeightYes = btn.offsetHeight;
    if (btn.classList.contains("yes") && isStop === false) {
      // hitung nilai left dan top yang dirandom
      const randomLeft = Math.random() * (window.innerWidth - btnWidthYes);
      const randowTop = Math.random() * (window.innerHeight - btnHeightYes);

      // terapkan gaya posisi ke elemen
      btn.style.left = `${randomLeft}px`;
      btn.style.top = `${randowTop}px`;
    }
  });

  btn.addEventListener("click", function () {
    if (btn.classList.contains("yes") && isStop === false) {
      // ubah display background baru menjadi ada
      let sound = new Audio("assets/audio/dame yo dame dame-(480p).wav");
      sound.play();
      // tombol tidak di klik
    } else if (btn.classList.contains("no")) {
      isStop = true;
      modal.classList.add("show");
      modalContent.classList.add("show");
      container.style.background = "rgba(0, 0, 0, 0.8)";
      // api jokes random
      fetch("https://candaan-api.vercel.app/api/text/random")
        .then((response) => response.json())
        .then((result) => {
          let sound = new Audio("assets/audio/loser.mp3");
          let modalDetail = `<div class="modal-detail">
            <div>
              <h2>ayolah trik sulapnya baru saja dimulai!</h2>
              <h2>jokes untuk hari ini :</h2>
            </div>
            <p class="modal-jokes">
              ${result.data}
            </p>
            <div>
              <img src="assets/img/lol.gif" alt="lol.gif" width="50%" />
            </div>
          </div>`;
          modalContent.innerHTML = modalDetail;
          sound.play();
          setTimeout(() => {
            speak(result.data);
          }, 2500);
        });
    }
  });
});

// cursor costume
let cursor = document.querySelector(".cursor");
let coards = { x: 0, y: 0 };
const cursorX = cursor.offsetWidth;
const cursorY = cursor.offsetHeight;
window.addEventListener("mousemove", (e) => {
  coards.x = e.clientX;
  coards.y = e.clientY;

  // batas kiri dan atas
  let left = Math.max(0, coards.x - cursorX / 2);
  let top = Math.max(0, coards.y - cursorY / 2);

  left = Math.min(left, window.innerWidth - cursorX);
  top = Math.min(top, window.innerHeight - cursorY);

  // implementasi cursor
  cursor.style.left = `${left}px`;
  cursor.style.top = `${top}px`;
});
