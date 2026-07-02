const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.querySelector(".hero-dots");

let index = 0;
const total = slides.length;
let interval;

// CREATE DOTS
function createDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("hero-dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      index = i;
      updateSlider();
      resetAuto();
    });

    dotsContainer.appendChild(dot);
  });
}

// UPDATE SLIDE
function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;

  document.querySelectorAll(".hero-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// NEXT SLIDE
function nextSlide() {
  index = (index + 1) % total;
  updateSlider();
}

// AUTO SLIDE
function startAuto() {
  interval = setInterval(nextSlide, 3000);
}

// RESET AUTO
function resetAuto() {
  clearInterval(interval);
  startAuto();
}

// INIT
createDots();
startAuto();

// PAUSE ON HOVER (Amazon style)
const sliderContainer = document.querySelector(".hero-slider");

sliderContainer.addEventListener("mouseenter", () => clearInterval(interval));
sliderContainer.addEventListener("mouseleave", startAuto);
