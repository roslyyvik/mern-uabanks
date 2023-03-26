import React, { useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import styled from 'styled-components'
import useLocalState from '../utils/localState'
import FormRow from '../components/FormRow'

import url from '../utils/url'

const AddReviews = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [ values, setValues ] = useState({
    rating: 0,
    title: '',
    comment: '',
  })

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert
  } = useLocalState()

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    hideAlert()
    setLoading(true)
    const { rating, title, comment } = values
    let addNewReview = {bank: id, rating, title, comment }

    try {
      const { data } = await axios.post(
        `${url}/api/v1/reviews`,
        addNewReview
      )
      setSuccess(true)
      setValues({ rating: 0, title: '', comment: '' })
      showAlert({ text: data.msg, type: 'success' })
      navigate('/reviews')
    } catch (error) {
      const { msg } = error.response.data
      showAlert({ text: msg || 'there was an error' })
    }
    setLoading(false)
  }

    if(loading){
    return <Loading/>
  }

    return (
      <Wrapper className='page'>
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <form
          className={loading ? 'form form-loading': 'form'}
          onSubmit={onSubmit}
        >
          <FormRow
            type='number'
            name='rating'
            min="1"
            max="5"
            value={values.rating}
            handleChange={handleChange}
          />

          {/* single form row */}
          <FormRow
            type='text'
            name='title'
            value={values.title}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <label htmlFor='comment' className='form-label'>
            your comment
          </label>
            <textarea
              id='comment'
              name='comment'
              rows='10'
              maxLength='200'
              value={values.comment}
              onChange={handleChange}
              className='form-input'
              required={true}
            >
            </textarea>

          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Loading...' : 'Create Review'}
          </button>
        </form>
      </Wrapper>
    )
}

const Wrapper = styled.section`
textarea {
  resize: none;
}
.alert {
  margin-top: 3rem;
  margin-bottom: -1.5rem;
}
h4 {
  text-align: center;
}
p {
  margin: 0;
  margin-top: 1rem;
  text-align: center;
}
.login-link {
  display: inline-block;
  margin-left: 0.25rem;
  text-transform: capitalize;
  color: var(--primary-500);
  cursor: pointer;
}
.btn:disabled {
  cursor: not-allowed;
}
`

export default AddReviews
