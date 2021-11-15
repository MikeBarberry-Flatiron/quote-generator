import Show from './Show.js'

export default class QuoteGenerator {
    constructor() {
        this.getData()
    }

    getData() {
        fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(shows => {
            shows.map(show => {
            new Show(show)
            })
        })
    }
}