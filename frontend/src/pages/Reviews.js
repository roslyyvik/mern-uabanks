import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useGlobalContext } from "../context"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import url from '../utils/url'

const Reviews = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {user} = useGlobalContext()
  const [ loading, setLoading ] = useState(false)
  const [ userReviews, setUserReviews ] = useState([])

  useEffect(() => {
    setLoading(true)
    async function getSingleBankReviews() {
      try {
        const response = await axios(`${url}/api/v1/users/${user.userId}/reviews`)
        const { reviews } = response.data
        setUserReviews(reviews)
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    getSingleBankReviews()
  },[user.userId])

  // handling Delete
    const handleDelete = async (id) => {
      await axios.delete(`${url}/api/v1/reviews/${id}`)
      navigate(`/reviewslist`)
    }

  if(loading){
    return <Loading/>
  }

  if(userReviews.length < 1){
    return (
      <h2>no {user.name}'s reviews</h2>
    )
  }

  return (
    <main>
      <div>{user.name}'s Reviews</div>
      <div>
        <table>
        <thead>
          <tr>
            <td>n</td>
            <td>bank</td>
            <td>title</td>
            <td>comment</td>
            <td>rating</td>
            <td>edit</td>
            <td>delete</td>
          </tr>
        </thead>
        <tbody>
        {userReviews.map((review, i) => (
          <tr key={review._id}>
            <td>{i + 1}</td>
            <td>{review.bank.SHORTNAME}</td>
            <td>{review.title}</td>
            <td>{review.comment}</td>
            <td>{review.rating}</td>
            <td><Link to={`/editreview/${review._id}`}>{<FaRegEdit/>}</Link></td>
            <td>
              <button
                onClick={() => handleDelete(review._id)}
                className='btn'
              >{<MdDelete/>}
              </button>
            </td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    </main>
  )
}

export default Reviews
