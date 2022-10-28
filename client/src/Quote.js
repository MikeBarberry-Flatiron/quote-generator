export default class Quote {
    createQuote(self, quote, ul) {
        const ele = document.createElement('li');
        ele.setAttribute('id', quote.id);
        ele.innerText = quote.quote;

        const button = document.createElement('button');
        button.setAttribute('class', 'deleteButton');
        button.innerText = "Delete";
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
        .then(confirmation => self.showDeleteSuccess(confirmation.message))
        });

        //append quote text and delete button on to ul received from Show class
        ele.append(button);
        ul.append(ele);
    }

    showDeleteSuccess(confirmation) {
        //flash success message
        const showMessage = document.getElementById('delete-success');
        showMessage.innerText = confirmation.note;
        setTimeout(() => {
            showMessage.innerText = ""
        }, 1500);

        //remove quote from DOM without reloading page
        const showQuotes =  document.getElementById(`quote-list-${confirmation.quote.show_id}`);

        const quote = document.getElementById(confirmation.quote.id);

        showQuotes.removeChild(quote);
    }
}
