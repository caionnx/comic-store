export const addComicToCart = (comic) => ({
  type: 'ADD_COMIC',
  comic
})

export const removeComicFromCart = (id) => ({
  type: 'REMOVE_COMIC',
  id
})
