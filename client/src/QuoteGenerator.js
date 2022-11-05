import Show from './Show.js'

export default class QuoteGenerator {
    constructor() {
        //show loading icon while fetching data
        const loading = document.getElementById("loading");
        loading.toggleAttribute("hidden");

        fetch("https://nameless-gorge-25083.herokuapp.com/")
        .then(res => res.json())
        .then(shows => {
            //hide loading icon after receiving data
            loading.toggleAttribute("hidden")

            //build DOM for each show
            shows.map(show => {
                const s = new Show(show)
                s.buildQuotes(show.quotes)
            })
        });
    }
}
