import Show from './Show.js'

export default class QuoteGenerator {
    constructor() {
        this.getData()
    }

    getData() {
        fetch('https://nameless-gorge-25083.herokuapp.com/")
        .then(res => res.json())
        .then(shows => {
            shows.map(show => {
            new Show(show)
            })
        })
    }
}
