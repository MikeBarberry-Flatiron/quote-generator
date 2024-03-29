import { apiURL } from "../utils/index.js";

export default class Quote {
  constructor(show) {
    this.show = show;
  }

  createQuote(quote, ul) {
    const boundShowDeleteSuccess = this.show.showDeleteSuccess.bind(this.show);

    const ele = document.createElement("li");
    const button = document.createElement("button");

    ele.setAttribute("id", quote.id);
    ele.innerText = quote.quote;
    button.setAttribute("class", "deleteButton");
    button.innerText = "Delete";
    button.addEventListener("click", function () {
      fetch(`${apiURL}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: quote.id,
        }),
      })
        .then((resp) => resp.json())
        .then((confirmation) => boundShowDeleteSuccess(confirmation.message));
    });

    ele.append(button);
    ul.append(ele);
  }
}
