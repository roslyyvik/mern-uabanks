import React from 'react'
import { Link } from 'react-router-dom'
import found from '../assets/images/found.jpg'

const Error = () => {
  return (
    <section className='error-page'>
      <div className='error-container'>
        <img src={found} alt='err' className='not-found' />
        <Link to='/' className='btn btn-primary btn-err'>
            back me home
        </Link>
      </div>
    </section>
  )
}

export default Error