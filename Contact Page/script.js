const hamburgerMenu = document.querySelector("#hamburger-menu")
const navMenu = document.querySelector(".nav-menu") 
const closeButton = document.querySelector("#close-button")

hamburgerMenu.addEventListener("click", () =>{
    navMenu.classList.toggle("active")
})

closeButton.addEventListener("click", () => {
    navMenu.classList.toggle("active")
})
