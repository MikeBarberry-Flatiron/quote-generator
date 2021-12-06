let selected_mode = 'light'  

const toggleButton = document.getElementById('toogle-dark-mode')

toggleButton.addEventListener("click", function() {

    const toggleMode = (text, background, color, mode) => {

        const body = document.getElementById('body')
        body.classList.toggle('darkMode');

        const posts = document.querySelectorAll('.post')
        
        toggleButton.innerText = `${text} mode`
        toggleButton.style.background = background
        toggleButton.style.color = color
        posts.forEach(post => post.style.boxShadow = `3px 4px 3px 4px ${background}`);
        selected_mode = mode
    }

    (selected_mode === 'light') ? toggleMode('light', 'white', 'black', 'dark') : toggleMode('dark', 'black', 'white', 'light')  

})