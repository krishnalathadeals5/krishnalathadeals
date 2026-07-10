const track = document.querySelector(".hero-track");
const dotsContainer = document.querySelector(".hero-dots");
const prevBtn = document.querySelector(".hero-prev");
const nextBtn = document.querySelector(".hero-next");

let slides = document.querySelectorAll(".hero-slide");
let slideCount = slides.length;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slideCount - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll(".hero-slide");

let index = 1;
let interval;

// Set initial position
track.style.transform = `translateX(-${index * 100}%)`;

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";

  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("hero-dot");

    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      index = i + 1;
      updateSlider();
      resetAuto();
    });

    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll(".hero-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index - 1);
  });
}

function updateSlider() {
  track.style.transition = "transform .5s ease";
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

function nextSlide() {
  if (index >= slides.length - 1) return;
  index++;
  updateSlider();
}

function prevSlide() {
  if (index <= 0) return;
  index--;
  updateSlider();
}

track.addEventListener("transitionend", () => {

  if (slides[index].id === "first-clone") {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (slides[index].id === "last-clone") {
    track.style.transition = "none";
    index = slideCount;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  updateDots();
});

// Buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAuto();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAuto();
});

// Auto slide
function startAuto() {
  interval = setInterval(nextSlide, 5000);
}

function resetAuto() {
  clearInterval(interval);
  startAuto();
}

// Pause on hover
const slider = document.querySelector(".hero-slider");

slider.addEventListener("mouseenter", () => clearInterval(interval));
slider.addEventListener("mouseleave", startAuto);

// Initialize
createDots();
startAuto();
