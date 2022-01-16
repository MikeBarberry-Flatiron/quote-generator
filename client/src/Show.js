import Quote from './Quote.js'

export default class Show {
    constructor(show) {
        const container = document.getElementById('post-container');

        const addButton = document.createElement('button');
        addButton.innerText = "Add";
        addButton.setAttribute('class', 'addButton');
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
            .then(confirmation => Quote.showAddSuccess(confirmation.message))
        });

        const name = document.createElement('h2');
        name.innerText = show.name;

        const ul = document.createElement('ul');
        ul.setAttribute('class', 'quoteList');
        ul.setAttribute('id', `quote-list-${show.id}`);

        //create container div and append add button, show name, and list of quotes
        const post = document.createElement('div');
        post.setAttribute('class', 'post');
        post.setAttribute('id', show.id);
        post.append(addButton, name, ul);
        container.append(post);

        //pass ul to each quote (it will append itself there) and build new quote for each
        show.quotes.forEach(quote => {
            new Quote(quote, ul)
        });
    }
}
