export default class Quote {
    constructor(quote, ul) {
        const ele = document.createElement('li')
        ele.setAttribute('id', quote.id)
        ele.innerText = quote.quote 
        const button = document.createElement('button')
        button.setAttribute('class', 'deleteButton')
        button.innerText = "Delete"
        button.addEventListener("click", function() {
        fetch("https://nameless-gorge-25083.herokuapp.com/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: quote.id,
            })
        })
        .then(resp => resp.json())
        .then(confirmation => Quote.showDeleteSuccess(confirmation.message))
        })
        ele.append(button)
        ul.append(ele)
    }

    static showDeleteSuccess(confirmation) {
        const showMessage = document.getElementById('delete-success')
        showMessage.innerText = confirmation.note
        setTimeout(() => {
            showMessage.innerText = ""
        }, 1500)

        const showQuotes =  document.getElementById(`quote-list-${confirmation.quote.show_id}`)
        const quote = document.getElementById(confirmation.quote.id)
        showQuotes.removeChild(quote)
    }

    static showAddSuccess(confirmation) {
        const showMessage = document.getElementById('add-success')
        showMessage.innerText = confirmation.note
        setTimeout(() => {
           showMessage.innerText = ""
        }, 1500)

        const showQuotes =  document.getElementById(`quote-list-${confirmation.quote.show_id}`)

        const ele = document.createElement('li')
        ele.setAttribute('id', confirmation.quote.id)
        ele.innerText = confirmation.quote.quote 
        const button = document.createElement('button')
        button.setAttribute('class', 'deleteButton')
        button.innerText = "Delete"
        button.addEventListener("click", function() {
        fetch("https://nameless-gorge-25083.herokuapp.com/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: confirmation.quote.id,
            })
        })
        .then(resp => resp.json())
        .then(confirmation => Quote.showDeleteSuccess(confirmation.message))
        })
        ele.append(button)
        showQuotes.prepend(ele)
    }
}
