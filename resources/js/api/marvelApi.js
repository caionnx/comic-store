export default class MarvelAPI {
  state = {
    mandatoryFilters: {
      orderBy: '-issueNumber'
    },
    requestList: []
  }

  serialize (obj) {
    return Object.entries(obj).map(([key, val]) => `${key}=${encodeURI(val)}`).join('&')
  }

  parseResults (request) {
    return new Promise(resolve => {
      request.then(
        response => response.json().then(data => {
          const search = data.data
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
