import axios from 'axios'

export class MarvelAPI {
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
    return new Promise((resolve, reject) => {
      request.then(response => {
        const search = response && response.data && response.data.data
        if (search) {
          search.results = this.generateRares(search.results, search.count)
          resolve(search)
        } else {
          reject(new Error('Failed in request'))
        }
      })
    })
  }

  getComics (filters = {}) {
    const params = this.serialize({...filters, ...this.state.mandatoryFilters})
    const requestTo = `https://gateway.marvel.com/v1/public/comics?apikey=11eccfa59c07a22aff04caca647aa978&${params}`
    const existingRequest = this.state.requestList.find(item => item.params === params)

    if (existingRequest) {
      return existingRequest.promise
    } else {
      const newRegister = this.parseResults(axios(requestTo))
      this.state.requestList.push({ params, promise: newRegister })
      return newRegister
    }
  }
}

const marvelAPI = new MarvelAPI()

export default marvelAPI
