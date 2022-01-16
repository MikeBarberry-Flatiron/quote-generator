//default to light mode
let selected_mode = 'light'  

//define function to handle changing between modes
const toggleMode = (tag, props, background, color, mode) => {

    const body = document.getElementById('body')
    body.classList.toggle('darkMode');

    const posts = document.querySelectorAll('.post')

    const oldIcon = document.getElementById((tag === 'sun') ? 'moon' : 'sun')
    const newIcon = document.createElement('i')
    newIcon.id = tag
    newIcon.className = props

    toggleButton.replaceChild(newIcon, oldIcon)
    
    toggleButton.style.background = background
    toggleButton.style.color = color
    posts.forEach(post => post.style.boxShadow = `3px 4px 3px 4px ${background}`);
    selected_mode = mode
    localStorage.setItem('mode', mode)
}

//restore theme after page reload
window.addEventListener('load', () => {
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
        toggleMode('sun', 'fa fa-sun-o', 'white', 'rgb(48, 48, 48)', 'dark')
        setTimeout(() => {
            const posts = document.querySelectorAll('.post')
            posts.forEach(post => post.style.boxShadow = `3px 4px 3px 4px white`);
        }, 100)
    }
})

//add event listener to invoke function and change theme
const toggleButton = document.getElementById('toogle-dark-mode')
toggleButton.addEventListener("click", function() {
    (selected_mode === 'light') 
        ? toggleMode('sun', 'fa fa-sun-o', 'white', 'rgb(48, 48, 48)', 'dark') 
        : toggleMode('moon', 'fa fa-moon-o', 'rgb(48, 48, 48)', 'white', 'light')  
})