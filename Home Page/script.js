const navMenu = document.querySelector(".nav-menu")
const links = navMenu.getElementsByClassName("nav-link")

for(let i = 0; i > navLink.length; i++) {
    links[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active")
        current[0].className = current[0].className.replace("active", "")
        this.className += "active"
    })
}