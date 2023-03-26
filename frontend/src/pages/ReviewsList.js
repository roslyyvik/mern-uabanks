import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

import url from '../utils/url'

const ReviewsList = () => {
  const [ loading, setLoading ] = useState(false)
  const [ reviewsList, setReviewsList ] = useState([])

  useEffect(() => {
    setLoading(true)
    async function getReviewsList () {
      try {
        const response = await axios(`${url}/api/v1/reviews/`)
        const { reviews } = response.data
        setReviewsList(reviews)
      } catch (error) {
        console.log(error.response);
      }
      setLoading(false)
    }
    getReviewsList()
  },[])

  if(loading){
    return <Loading/>
  }

  if(reviewsList.length < 1){
    return (<h2>No Reviews in This List</h2>)
  }

  return (
    <section className='followers'>
      <h1>Відгуки Банків України {reviewsList.length} </h1>
      <div className='container'>
              <table>
                <thead>
                  <tr>
                    <td>n</td>
                    <td>author</td>
                    <td>bank</td>
                    <td>title</td>
                    <td>comment</td>
                    <td>rating</td>
                  </tr>
                </thead>
                <tbody>
                {reviewsList.map((review, i) => (
                  <tr>
                    <td>{ i + 1 }</td>
                    <td>{review.user.name}</td>
                    <td>
                      <Link to={`/bank/${review.bank.MFO}/reviews`}>
                        {review.bank.SHORTNAME}
                      </Link>
                    </td>
                    <td>{review.title }</td>
                    <td>{ review.comment }</td>
                    <td>{ review.rating }</td>
                  </tr>
                ))}
                </tbody>
              </table>
      </div>
    </section>
  )
}

export default ReviewsList
