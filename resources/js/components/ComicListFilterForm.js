import React from 'react'
import { connect } from 'react-redux'
import { toggleFull } from '../actions/fetching'
import { setText, setSearchParams } from '../actions/filter'
import { startSetComics } from '../actions/comics'

class ComicListFilterForm extends React.Component {
  onFormSubmit = (e) => {
    e.preventDefault()
    const {
      filter,
      toggleFetchingFull,
      setFilterText,
      startSetComics,
      setSearchParams
    } = this.props
    const title = e.target.querySelector('#title-input').value
    const validParam = title.length > 0 ? { title } : filter.minimal

    toggleFetchingFull()
    setFilterText(title)

    startSetComics(validParam).then(data => {
      const { offset, count, total } = data
      this.props.setSearchParams({ offset, count, total })

      toggleFetchingFull()
    })
  }

  onClearForm = (e) => {
    e.preventDefault()
    const {
      setFilterText,
      startSetComics,
      setSearchParams,
      filter
    } = this.props
    const titleElem = e.target.closest('form').querySelector('#title-input')
    titleElem.value = ''

    setFilterText(null)
    startSetComics(filter.minimal).then(data => {
      const { offset, count, total } = data
      setSearchParams({ offset, count, total })
    })
  }

  componentWillUnmount () {
    const { setFilterText } = this.props
    setFilterText(null)
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit} className='l-input-group'>
        <div className='l-input-group__item'>
          <input className='c-input' type='text' id='title-input' placeholder='Insert comic title' />
        </div>
        <div className='l-input-group__item'>
          <button className='c-button c-button--full-width' disabled={this.props.fetching.full}>Search</button>
        </div>
        { this.props.filter.text &&
          <div className='l-input-group__item'>
            <button className='c-button c-button--full-width' onClick={this.onClearForm}>Clear</button>
          </div>
        }
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  fetching: state.fetching
})

const mapDispatchToProps = (dispatch) => ({
  toggleFetchingFull: () => dispatch(toggleFull()),
  setFilterText: (text) => dispatch(setText(text)),
  setSearchParams: (params) => dispatch(setSearchParams(params)),
  startSetComics: (params) => dispatch(startSetComics(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ComicListFilterForm)
