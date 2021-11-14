class API {
    constructor() {
        fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(shows => {
            shows.map(show => {
                UI.generateUI(show)
            })
        })
    }
}

class UI {
    static generateUI(show) {
        const container = document.getElementById('container')

        const addButton = document.createElement('button')
        addButton.setAttribute('type', 'button')
        addButton.innerText = "Add"
        addButton.setAttribute('id', show.id)
        addButton.setAttribute('class', 'addButton')
        addButton.addEventListener("click", function() {
            fetch('http://localhost:3000/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: show.id 
                })
            })
            .then(resp => resp.json())
            .then(confirmation => UI.showAddSuccess(confirmation))
        })

        const name = document.createElement('h2')
        name.innerText = show.name

        const ul = document.createElement('ul')
        ul.setAttribute('class', 'dishList')

        show.quotes.forEach(quote => {
            const ele = document.createElement('li')
            ele.innerText = quote.quote 
            const button = document.createElement('button')
            button.setAttribute('id', quote.id)
            button.setAttribute('class', 'deleteButton')
            button.setAttribute('type', 'button')
            button.innerText = "Delete"
            button.addEventListener("click", function() {
            fetch('http://localhost:3000/delete', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: quote.id,
                })
            })
            .then(resp => resp.json())
            .then(confirmation => UI.showDeleteSuccess(confirmation))
            })
            ele.append(button)
            ul.append(ele)
        })

        const post = document.createElement('div')
        post.setAttribute('class', 'post')
        post.append(addButton, name, ul)
        container.append(post)
    }

    static showDeleteSuccess(confirmation) {
        const showMessage = document.getElementById('delete-success')
        showMessage.innerText = confirmation.message
        setTimeout(function() {
            window.location.reload(1)
        }, 1500
        )
    }

    static showAddSuccess(confirmation) {
        const showMessage = document.getElementById('add-success')
        showMessage.innerText = confirmation.message
        setTimeout(function() {
            window.location.reload(1)
        }, 800
        )
    }
}

new API

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