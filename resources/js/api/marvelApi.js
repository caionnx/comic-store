export default class MarvelAPI {
  state = {
    percentageOfRareComics: 10,
    mandatoryFilters: {
      orderBy: '-issueNumber',
      format: 'comic',
      formatType: 'comic',
      noVariants: 'true'
    },
    requestList: []
  }

  serialize (obj) {
    return Object.entries(obj).map(([key, val]) => `${key}=${encodeURI(val)}`).join('&')
  }

  generateRares (data, count) {
    const totalOfRares = Math.floor((this.state.percentageOfRareComics * count) / 100)
    const indexOfRare = []

    while (true) {
      const random = Math.floor(Math.random() * data.length)
      if (!indexOfRare.find(n => n === random)) {
        indexOfRare.push(random)
      }
      if (indexOfRare.length >= totalOfRares) {
        return data.map((comic, index) => {
          if (indexOfRare.includes(index)) {
            comic.rareIssue = true
          }
          return comic
        })
      }
    }
  }

  parseResults (request) {
    return new Promise(resolve => {
      request.then(
        response => response.json().then(data => {
          const search = data.data
          search.results = this.generateRares(search.results, search.count)
          resolve(search)
        })
      )
    })
  }

  getComics (filters = {}) {
    const params = this.serialize({...filters, ...this.state.mandatoryFilters})
    const request = new Request(`https://gateway.marvel.com/v1/public/comics?apikey=11eccfa59c07a22aff04caca647aa978&${params}`)
    const existingRequest = this.state.requestList.find(item => item.params === params)

    if (existingRequest) {
      return existingRequest.promise
    } else {
      const newRegister = this.parseResults(fetch(request))
      this.state.requestList.push({ params, promise: newRegister })
      return newRegister
    }
  }
}
