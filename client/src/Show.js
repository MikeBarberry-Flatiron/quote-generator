import Quote from "./Quote.js";

export default class Show {
  constructor(show) {
    this.ul = this.createShow(show);
  }

  createShow(show) {
    const boundShowAddSuccess = this.showAddSuccess.bind(this);

    const container = document.getElementById("post-container");
    const addButton = document.createElement("button");
    const name = document.createElement("h2");
    const ul = document.createElement("ul");
    const post = document.createElement("div");

    addButton.innerText = "Add";
    addButton.setAttribute("class", "addButton");
    addButton.addEventListener("click", function () {
      fetch(
        "https://efoksp21r7.execute-api.us-west-2.amazonaws.com/main/api/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: show.id,
          }),
        }
      )
        .then((resp) => resp.json())
        .then((confirmation) => {
          boundShowAddSuccess(confirmation.message);
        });
    });

    name.innerText = show.name;

    ul.setAttribute("class", "quoteList");
    ul.setAttribute("id", `quote-list-${show.id}`);

    //create container div and append add button, show name, and list of quotes
    post.setAttribute("class", "post");
    post.setAttribute("id", show.id);
    post.append(addButton, name, ul);
    container.append(post);

    return ul;
  }

  //pass ul to each quote (it will append itself there) and build new quote for each
  buildQuotes(quotes) {
    quotes.forEach((quote) => {
      const _quote = new Quote(this);
      _quote.createQuote(quote, this.ul);
    });
  }

  showAddSuccess(confirmation) {
    //flash success message
    const showMessage = document.getElementById("add-success");
    showMessage.innerText = confirmation.note;
    setTimeout(() => {
      showMessage.innerText = "";
    }, 1500);

    //build new quote and add to DOM without page reload
    const showQuotes = document.getElementById(
      `quote-list-${confirmation.quote.show_id}`
    );
    const _quote = new Quote(this);
    _quote.createQuote(confirmation.quote, showQuotes);
  }

  showDeleteSuccess(confirmation) {
    //flash success message
    const showMessage = document.getElementById("delete-success");
    showMessage.innerText = confirmation.note;
    setTimeout(() => {
      showMessage.innerText = "";
    }, 1500);

    //remove quote from DOM without reloading page
    const showQuotes = document.getElementById(
      `quote-list-${confirmation.quote.show_id}`
    );
    const quote = document.getElementById(confirmation.quote.id);
    showQuotes.removeChild(quote);
  }
}
