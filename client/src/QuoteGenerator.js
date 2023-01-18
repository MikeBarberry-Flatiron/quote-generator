import Show from "./Show.js";
import { apiURL } from "../lib/utils.js";

export default class QuoteGenerator {
  constructor() {
    //show loading icon while fetching data
    const loading = document.getElementById("loading");
    loading.toggleAttribute("hidden");

    fetch(`${apiURL}/`)
      .then((res) => res.json())
      .then((shows) => {
        //hide loading icon after receiving data
        loading.toggleAttribute("hidden");

        //build DOM for each show
        shows.map((show) => {
          const newShow = new Show(show);
          newShow.buildQuotes(show.quotes);
        });
      });
  }
}
