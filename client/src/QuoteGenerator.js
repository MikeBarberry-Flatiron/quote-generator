import { apiURL } from "../utils/index.js";

import Show from "./Show.js";

export default class QuoteGenerator {
  constructor() {
    const loading = document.getElementById("loading");
    loading.toggleAttribute("hidden");

    fetch(`${apiURL}/`)
      .then((res) => res.json())
      .then((shows) => {
        loading.toggleAttribute("hidden");

        shows.map((show) => {
          const newShow = new Show(show);
          newShow.buildQuotes(show.quotes);
        });
      });
  }
}
