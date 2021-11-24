import Show from './Show.js'

export default class QuoteGenerator {
    constructor() {
        this.getData()
    }

    getData() {
		const loading = document.getElementById("loading")
		loading.toggleAttribute("hidden")
        fetch("https://nameless-gorge-25083.herokuapp.com/")
        .then(res => res.json())
        .then(shows => {
			loading.toggleAttribute("hidden")
            shows.map(show => {
            new Show(show)
            })
        })
    }
}
