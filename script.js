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

const slides = document.querySelectorAll(".slide");
const radioButtons = document.querySelectorAll('input[name="radio-btn"]');
const manualBtns = document.querySelectorAll(".manual-btn"); // Select manual buttons
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });

  radioButtons.forEach((radio, i) => {
    radio.checked = i === index;
  });

  manualBtns.forEach((btn, i) => {
    btn.classList.remove("active");
    if (i === index) {
      btn.classList.add("active");
    }
  });
}

function nextSlide() {
  console.log("working");
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

manualBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});
