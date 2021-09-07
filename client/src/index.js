class API {
    constructor() {
        fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(restaurants => {
            restaurants.map(restaurant => {
                UI.generateUI(restaurant)
            })
        })
    }
}

class UI {
    static generateUI(restaurant) {
        const container = document.getElementById('container')

        const addButton = document.createElement('button')
        addButton.setAttribute('type', 'button')
        addButton.innerText = "Add"
        addButton.setAttribute('id', restaurant.id)
        addButton.setAttribute('class', 'addButton')
        addButton.addEventListener("click", function() {
            fetch('http://localhost:3000/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: restaurant.id 
                })
            })
            .then(resp => resp.json())
            .then(confirmation => UI.showAddSuccess(confirmation))
        })

        const name = document.createElement('h2')
        name.innerText = restaurant.name

        const ul = document.createElement('ul')
        ul.setAttribute('class', 'dishList')

        restaurant.foods.forEach(food => {
            const dish = document.createElement('li')
            dish.innerText = food.dish 
            const button = document.createElement('button')
            button.setAttribute('id', food.id)
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
                    id: food.id,
                })
            })
            .then(resp => resp.json())
            .then(confirmation => UI.showDeleteSuccess(confirmation))
            })
            dish.append(button)
            ul.append(dish)
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

let lightMode = true  
const toggleButton = document.getElementById('toogle-dark-mode')
toggleButton.addEventListener("click", function() {
    const background = document.getElementById('body')
    const posts = document.querySelectorAll('.post')
    background.classList.toggle('darkMode');
    if (lightMode) {
        posts.forEach(post => post.style.boxShadow = "3px 4px 3px 4px white");
        lightMode = false
    } else {
        posts.forEach(post => post.style.boxShadow = "3px 4px 3px 4px black");
        lightMode = true 
    }
})