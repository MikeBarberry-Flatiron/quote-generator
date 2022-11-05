//default to light mode
let selected_mode = 'light';  

//define function to handle changing between modes
const toggleMode = (currentMode, icon, background, iconColor, nextMode) => {

    //body level changes defined in style.css
    const body = document.getElementById('body');
    body.classList.toggle('darkMode');


    //swap out icon when mode is changed
    const oldIcon = document.getElementById((currentMode === 'sun') ? 'moon' : 'sun');
    const newIcon = document.createElement('i');
    newIcon.id = currentMode;
    newIcon.className = icon;

    toggleButton.replaceChild(newIcon, oldIcon);
    toggleButton.style.background = background;
    toggleButton.style.color = iconColor;

    //apply theme change to posts
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => post.style.boxShadow = `3px 4px 3px 4px ${background}`);

    //update selected mode and store preference in local storage
    selected_mode = nextMode;
    localStorage.setItem('mode', nextMode);
};

//restore theme after page reload
window.addEventListener('load', () => {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        toggleMode('sun', 'fa fa-sun-o', 'white', 'rgb(48, 48, 48)', 'dark')
        setTimeout(() => {
            const posts = document.querySelectorAll('.post')
            posts.forEach(post => post.style.boxShadow = `3px 4px 3px 4px white`);
        }, 300) //needs to be around 300 to allow time for posts to load 
    }
});

//add event listener to invoke function and change theme
const toggleButton = document.getElementById('toogle-dark-mode');
toggleButton.addEventListener("click", function() {
    (selected_mode === 'light') 
        ? toggleMode('sun', 'fa fa-sun-o', 'white', 'rgb(48, 48, 48)', 'dark') 
        : toggleMode('moon', 'fa fa-moon-o', 'rgb(48, 48, 48)', 'white', 'light')  
});