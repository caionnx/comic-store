import marvelApi from '../../api/marvelApi'
import { comics, request } from '../fixtures/comics'

test('Should transform object to url params', () => {
  const obj = { title: 'avengers', limit: 20, offset: 3 }
  const expected = `title=${obj.title}&limit=${obj.limit}&offset=${obj.offset}`

  expect(marvelApi.serialize(obj)).toEqual(expected)
})

test('Should generate rare comics', () => {
  const comicsWithRares = marvelApi.generateRares(comics, 20)
  const rares = comicsWithRares.filter(c => c.rareIssue)

  expect(rares).toHaveLength(2)
})

test('Should parse result with rares', () => {
  const fetchRequest = new Promise(resolve => {
    setTimeout(() => resolve({
      data: request
    }), 1000)
  })
  const result = marvelApi.parseResults(fetchRequest)

  return result.then((data) => {
    const resultComics = data.results
    const rareIssues = resultComics.filter(c => c.rareIssue)

    expect(resultComics).toHaveLength(comics.length)
    expect(rareIssues).toHaveLength(1)
  })
})

test('Should get promise from Marvel API', () => {
  const APIrequest = marvelApi.getComics()
  APIrequest.then(() => null)
  APIrequest.catch((e) => console.log(e))
  expect(typeof APIrequest.then).toBe('function')
})
