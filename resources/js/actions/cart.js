export const addComicToCart = (comic) => ({
  type: 'ADD_COMIC',
  comic
})

export const removeComicFromCart = (id) => ({
  type: 'REMOVE_COMIC',
  id
})

export const editComicOfCart = (id, updates) => ({
  type: 'EDIT_COMIC',
  id,
  updates
})

export const addDiscountObjectToCart = (discount) => ({
  type: 'ADD_DISCOUNT',
  discount
})
