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
        let container = document.getElementById('container')

        let addButton = document.createElement('button')
        addButton.setAttribute('type', 'button')
        addButton.innerText = "Add"
        addButton.setAttribute('id', restaurant.id)
        addButton.setAttribute('class', 'addButton')
        addButton.addEventListener("click", function() {
            fetch('http://localhost:3000/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: restaurant.id 
            })
            })
            window.location.reload(1)
        })

        let name = document.createElement('h2')
        name.innerText = restaurant.name

        let ul = document.createElement('ul')
        ul.setAttribute('class', 'dishList')

        restaurant.foods.forEach(food => {
            let dish = document.createElement('li')
            dish.innerText = food.dish 
            let button = document.createElement('button')
            button.setAttribute('id', food.id)
            button.setAttribute('class', 'deleteButton')
            button.setAttribute('type', 'button')
            button.innerText = "Delete"
            button.addEventListener("click", function() {
            fetch('http://localhost:3000/', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: food.id,
                })
            })
            .then(resp => resp.json())
            .then(json => console.log(json))
            window.location.reload(1)
            })
            dish.append(button)
            ul.append(dish)
        })

        let post = document.createElement('div')
        post.setAttribute('class', 'post')
        post.append(addButton, name, ul)
        container.append(post)
    }
}

api = new API 