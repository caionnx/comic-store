export const cartReducerDefaultState = {
  items: [],
  discounts: []
}

export default (state = cartReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_COMIC':
      return { ...state, items: [...state.items, action.comic] }
    case 'REMOVE_COMIC':
      return { ...state, items: state.items.filter(c => c.id !== action.id) }
    case 'EDIT_COMIC':
      return {
        ...state,
        items: state.items.map((comic) =>
          comic.id === action.id
            ? { ...comic, ...action.updates }
            : comic
        )
      }
    case 'ADD_DISCOUNT':
      return { ...state, discounts: [...state.discounts, action.discount] }
    default:
      return state
  }
}
