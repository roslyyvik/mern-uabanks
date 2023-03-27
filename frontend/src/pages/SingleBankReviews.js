import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
// import { useGlobalContext } from '../context'

// import url from '../utils/url'

const SingleBankReviews = () => {
  // const {  user} = useGlobalContext()
  const { mfo, id } = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ singleBankId, setSingleBankId ] = useState(null)
  const [ reviews, setReviews ] = useState([])

  useEffect(() => {
    setLoading(true)
    async function getSingleBankId() {
      try {
        const response = await axios(`/api/v1/banks/${mfo}`)
        const { bank } = response.data
        if(bank){
          const {
            _id: id,
            MFO: mfo,
            SHORTNAME: brand,
            KOD_EDRPOU: kod,
            group,
            NP: np,
            ADRESS: adress,
            P_IND:postindex,
            averageRating,
            numOfReviews,
            reviews,
          } = bank
          const newSingleBank = {
            id,
            mfo,
            brand,
            kod,
            group,
            np,
            adress,
            postindex,
            averageRating,
            numOfReviews,
            reviews,
          }
          setSingleBankId(newSingleBank)
        }else {
          setSingleBankId(null)
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    getSingleBankId()
  },[mfo])

  if(loading){
    return <Loading/>
  }
  if(!singleBankId){
    return <h2>no bank to display</h2>
  }else {
    const {
      id,
      mfo,
      brand,
      kod,
      group,
      np,
      adress,
      postindex,
      averageRating,
      numOfReviews,
      reviews,
    } = singleBankId
    return (
      <main>
        <h2>Установа: {brand}</h2>
        <ul className='single-bank-container'>
          <li>МФО: {mfo}</li>
          <li>КОД ЕДРПОУ: {kod}</li>
          <li>БАНКІВСЬКА ГРУПА: {group}</li>
          <li>АДРЕСА: {postindex}, {np}, {adress}  </li>
        </ul>
        <ul className='single-bank-container'>
          <li>РЕЙТИНГ: {averageRating}</li>
          <li>КІЛЬКІСТЬ ВІДГУКІВ: {numOfReviews}</li>
          <li><Link to={`/addreview/${id}`}>create review</Link></li>
          <li>
              {numOfReviews > 0 ? <table>
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
                {reviews.map((review, i) => (
                  <tr>
                    <td>{ i + 1 }</td>
                    <td>{review.user.name}</td>
                    <td>{brand}</td>
                    <td>{review.title }</td>
                    <td>{ review.comment }</td>
                    <td>{ review.rating }</td>
                  </tr>
                ))}
                </tbody>
              </table> : <h2>No Reviews For {brand}</h2>}
          </li>
        </ul>
      </main>
    )
  }
}

export default SingleBankReviews
