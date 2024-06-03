const hambugerMenu = document.querySelector(".hambuger-menu");
const navMenu = document.querySelector(".nav-menu");
const closeBtn = document.querySelector(".close-button");

hambugerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const questions = document.querySelectorAll(".the-questions");

questions.forEach((questions) => {
  questions.addEventListener("click", () => {
    questions.classList.toggle("active");
  });
});

// slide show
const slides = document.querySelectorAll(".slides");
const radioButtons = document.querySelectorAll(".radio-btn");
let currentSlide = 2;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "inactive");
    radioButtons[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      radioButtons[i].classList.add("active");
    } else if (i === (index + slides.length - 1) % slides.length) {
      slide.classList.add("inactive");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

radioButtons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});
