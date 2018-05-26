export default class MarvelAPI {
  constructor () {
    this.requestData()
  }

  parseResults (request) {
    this.requestResults = new Promise(resolve => {
      request.then(
        response => response.json().then(data => {
          const comics = data.data.results
          resolve(comics)
        })
      )
    })
  }

  requestData () {
    const myRequest = new Request('https://gateway.marvel.com/v1/public/comics?dateDescriptor=lastWeek&apikey=11eccfa59c07a22aff04caca647aa978')
    this.parseResults(fetch(myRequest))
  }

  getResults () {
    return this.requestResults
  }
}
