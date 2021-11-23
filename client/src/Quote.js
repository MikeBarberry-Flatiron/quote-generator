export default class Quote {
    constructor(quote, ul) {
        const ele = document.createElement('li')
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
        .then(confirmation => Quote.showDeleteSuccess(confirmation))
        })
        ele.append(button)
        ul.append(ele)
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
