import Show from "./Show.js";

export default class QuoteGenerator {
  constructor() {
    //show loading icon while fetching data
    const loading = document.getElementById("loading");
    loading.toggleAttribute("hidden");

    fetch("https://efoksp21r7.execute-api.us-west-2.amazonaws.com/main/api/")
      .then((res) => res.json())
      .then((shows) => {
        //hide loading icon after receiving data
        loading.toggleAttribute("hidden");

        //build DOM for each show
        shows.map((show) => {
          const _show = new Show(show);
          _show.buildQuotes(show.quotes);
        });
      });
  }
}
