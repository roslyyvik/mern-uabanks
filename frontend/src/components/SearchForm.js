import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

export default function SearchForm() {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = useRef('')

  useEffect(() => {
    searchValue.current.focus()
  },[])

  function searchBank() {
    setSearchTerm(searchValue.current.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <section>
      <form className='' onSubmit={handleSubmit}>
        <div>
          
          <input 
            type='text'
            name='name'
            id='name'
            ref={searchValue}
            onChange={searchBank}
          />
        </div>
      </form>
    </section>
  )
}

