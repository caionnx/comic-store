export default (state = [], action) => {
  switch (action.type) {
    case 'SET_COMICS':
      return action.comics
    case 'ADD_COMICS':
      return [...state, ...action.comics]
    default:
      return state
  }
}
