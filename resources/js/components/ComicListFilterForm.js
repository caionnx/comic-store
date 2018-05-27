import React from 'react'

const ComicListFilterForm = props => (
  <form onSubmit={props.onSubmit}>
    <input type='text' id='title-input' placeholder='Comic title' />
    <button disabled={props.isFetching}>Search</button>
    { props.hasFilterText && <button onClick={props.onClear}>Clear</button> }
  </form>
)

export default ComicListFilterForm
