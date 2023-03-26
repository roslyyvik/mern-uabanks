import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import styled from 'styled-components'
import useLocalState from '../utils/localState'
import FormRow from '../components/FormRow'

import url from '../utils/url'

const EditReview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(false)
  const [ singleReview, setSingleReview ] = useState(null)
  const [ rating, setRating ] = useState(0)
  const [ title, setTitle ] = useState('')
  const [ comment, setComment ] = useState('')

  const {
    alert,
    showAlert,
    success,
    setSuccess,
    hideAlert
  } = useLocalState()

  const onSubmit = async (e) => {
      e.preventDefault()
      hideAlert()
      setLoading(true)
      const updatedReview = { rating, title, comment }

      try {
        const { data } = await axios.patch(
          `${url}/api/v1/reviews/${id}`,
          updatedReview
        )
        setSuccess(true)
        showAlert({ text: data.msg, type: 'success' })
        navigate(`/reviews`)
      } catch (error) {
        const { msg } = error.response.data
        showAlert({ text: msg || 'there was an error' })
      }
      setLoading(false)
    }

  useEffect(() => {
    setLoading(true)
    async function getSingleReview () {
      try {
        const response = await axios(`${url}/api/v1/reviews/${id}`)
        const {review} = response.data
        setRating(review.rating)
        setTitle(review.title)
        setComment(review.comment)
        if(review){
          const {
            _id: id,
            rating,
            title,
            comment
          } = review
          const newSingleReview = {
            id,
            rating,
            title,
            comment
          }
          setSingleReview(newSingleReview)
        } else {
          setSingleReview(null)
        }
      } catch (error) {
        console.log(error.response);
      }
      setLoading(false)
    }
    getSingleReview()
  },[id])

  if(loading){
    return <Loading/>
  }
if(!singleReview){
  return <h2>no review to display</h2>
}
    return (
      <Wrapper className='page'>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form
          className={loading ? 'form form-loading': 'form'}
          onSubmit={onSubmit}
        >
          <FormRow
            type='number'
            name='rating'
            min="1"
            max="5"
            value={rating}
            handleChange={(e) => setRating(e.target.value)}
          />

          {/* single form row */}
          <FormRow
            type='text'
            name='title'
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='form-input'
              required={true}
            >
            </textarea>

          {/* end of single form row */}
          <button type='submit' className='btn btn-block' disabled={loading}>
            {loading ? 'Loading...' : 'Edit Review'}
          </button>
        </form>
      )}
      </Wrapper>
    )

}

const Wrapper = styled.main`
  button {
    margin-top: 2rem;
  }
`

export default EditReview
