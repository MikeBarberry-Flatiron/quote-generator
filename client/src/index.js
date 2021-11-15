import QuoteGenerator from "./QuoteGenerator.js"

new QuoteGenerator

let mode = 'light'  
const toggleButton = document.getElementById('toogle-dark-mode')

toggleButton.addEventListener("click", function() {
    const background = document.getElementById('body')
    const posts = document.querySelectorAll('.post')
    background.classList.toggle('darkMode');

    if (mode === 'light') {
        toggleButton.innerText = "light mode"
        toggleButton.style.background = "white"
        toggleButton.style.color = "black"
        posts.forEach(post => post.style.boxShadow = "3px 4px 3px 4px white");
        mode = 'dark'
    } else if (mode === 'dark') {
        toggleButton.innerText = "dark mode"
        toggleButton.style.background = "black"
        toggleButton.style.color = "white"
        posts.forEach(post => post.style.boxShadow = "3px 4px 3px 4px black");
        mode = 'light' 
    }
    
})