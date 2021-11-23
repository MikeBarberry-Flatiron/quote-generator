import Quote from './Quote.js'

export default class Show {
    constructor(show) {
        const container = document.getElementById('container')

        const addButton = document.createElement('button')
        addButton.innerText = "Add"
        addButton.setAttribute('class', 'addButton')
        addButton.addEventListener("click", function() {
            fetch("https://nameless-gorge-25083.herokuapp.com/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: show.id 
                })
            })
            .then(resp => resp.json())
            .then(confirmation => Quote.showAddSuccess(confirmation))
        })

        const name = document.createElement('h2')
        name.innerText = show.name

        const ul = document.createElement('ul')
        ul.setAttribute('class', 'quoteList')

        const post = document.createElement('div')
        post.setAttribute('class', 'post')
        post.append(addButton, name, ul)
        container.append(post)

        show.quotes.forEach(quote => {
            new Quote(quote, ul)
        })
    }
}
