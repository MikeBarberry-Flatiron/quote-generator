let selected_mode = 'light'  

const toggleButton = document.getElementById('toogle-dark-mode')

toggleButton.addEventListener("click", function() {

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
    }

    (selected_mode === 'light') ? toggleMode('sun', 'fa fa-sun-o', 'white', 'rgb(48, 48, 48)', 'dark') : toggleMode('moon', 'fa fa-moon-o', 'rgb(48, 48, 48)', 'white', 'light')  

})