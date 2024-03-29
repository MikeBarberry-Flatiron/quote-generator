import { apiURL } from "../utils/index.js";

import Quote from "./Quote.js";

export default class Show {
  constructor(show) {
    this.quoteList = this.createShow(show);
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
      fetch(`${apiURL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: show.id,
        }),
      })
        .then((resp) => resp.json())
        .then((confirmation) => {
          boundShowAddSuccess(confirmation.message);
        });
    });

    name.innerText = show.name;

    ul.setAttribute("class", "quoteList");
    ul.setAttribute("id", `quote-list-${show.id}`);

    post.setAttribute("class", "post");
    post.setAttribute("id", show.id);
    post.append(addButton, name, ul);
    container.append(post);

    return ul;
  }

  buildQuotes(quotes) {
    quotes.forEach((quote) => {
      const newQuote = new Quote(this);
      newQuote.createQuote(quote, this.quoteList);
    });
  }

  showAddSuccess(confirmation) {
    const showMessage = document.getElementById("add-success");
    showMessage.innerText = confirmation.note;
    setTimeout(() => {
      showMessage.innerText = "";
    }, 1500);

    const showQuotes = document.getElementById(
      `quote-list-${confirmation.quote.show_id}`
    );
    const newQuote = new Quote(this);
    newQuote.createQuote(confirmation.quote, showQuotes);
  }

  showDeleteSuccess(confirmation) {
    const showMessage = document.getElementById("delete-success");
    showMessage.innerText = confirmation.note;
    setTimeout(() => {
      showMessage.innerText = "";
    }, 1500);

    const showQuotes = document.getElementById(
      `quote-list-${confirmation.quote.show_id}`
    );
    const quote = document.getElementById(confirmation.quote.id);
    showQuotes.removeChild(quote);
  }
}
