const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");

let index = 0;
const total = slides.length;

function moveSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

function autoSlide() {
  index = (index + 1) % total;
  moveSlide();
}

let slider = setInterval(autoSlide, 3000);

const sliderContainer = document.querySelector(".hero-slider");

sliderContainer.addEventListener("mouseenter", () => clearInterval(slider));
sliderContainer.addEventListener("mouseleave", () => {
  slider = setInterval(autoSlide, 3000);
});
