import React from 'react'

const ComicListFilterForm = props => (
  <form onSubmit={props.onSubmit} className='l-input-group'>
    <div className='l-input-group__item'>
      <input className='c-input' type='text' id='title-input' placeholder='Insert comic title' />
    </div>
    <div className='l-input-group__item'>
      <button className='c-button c-button--full-width' disabled={props.isFetching}>Search</button>
    </div>
    { props.hasFilterText &&
      <div className='l-input-group__item'>
        <button className='c-button c-button--full-width' onClick={props.onClear}>Clear</button>
      </div>
    }
  </form>
)

export default ComicListFilterForm
