import React, { useState, useEffect, lazy, Suspense } from 'react'
import SEO from '../components/SEO';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import {FaAngleDoubleLeft, FaStar} from 'react-icons/fa'

const AssetsItem = lazy(() => import('../components/AssetsItem'))
const CapitalItem = lazy(() => import('../components/CapitalItem'))
const LiabilitiesItem = lazy(() => import('../components/LiabilitiesItem'))
const ProfitItem = lazy(() => import('../components/ProfitItem'))

// import url from '../utils/url'
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

const BankPage = () => {
  const { mfo,} = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ singleBank, setSingleBank ] = useState(null)
  // const [currentValue, setCurrentValue] = useState(0);

  const stars = Array(5).fill(0)

  useEffect(() => {
    setLoading(true)
    async function getSingleBank() {
      try {
        const response = await axios(`/api/v1/banks/${mfo}`)
        const {bank} = response.data
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
          setSingleBank(newSingleBank)
        }else {
          setSingleBank(null)
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    getSingleBank()
  },[mfo])

  if(loading){
    return <Loading/>
  }

  if(!singleBank){
    return <h2>no bank to display</h2>
  }
  else {
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
    } = singleBank
    return (
      <main>
        <SEO
        title='Фінансовий Стан Банків України'
        description="Динаміка зміни АКТИВІВ, ЗОБОВ'ЯЗАНЬ, КАПІТАЛУ ТА ПРИБУТКУ банків України в розрізі окремого банку. Можливість аналізу у групах, сортування по показниках.Відгуки щодо фінансового стану окремого банку України."
        name=""
        type=""
      />
        <Link to='/'>
        <button  className='btn btn-details'><FaAngleDoubleLeft/> back home</button>
        </Link>
        <h2>Установа: {brand}</h2>
        <ul className='single-bank-container'>
          <li>МФО: {mfo}</li>
          <li>КОД ЕДРПОУ: {kod}</li>
          <li>БАНКІВСЬКА ГРУПА: {group}</li>
          <li>АДРЕСА: {postindex}, {np}, {adress}  </li>
        </ul>
        <ul className='single-bank-container'>
          <li>РЕЙТИНГ: {averageRating}</li>
          <li>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  color={averageRating > index ? colors.orange : colors.grey }
                  style={{
                    marginRight: 10,
                  }}
                />
              )
            })}
          </li>
          <li>КІЛЬКІСТЬ ВІДГУКІВ: {numOfReviews}</li>
          <li>
            <Link to={`/bank/${mfo}/reviews`}>Reviews</Link>
          </li>
          <li>
            <Link to={`/addreview/${id}`}>Add review</Link>
          </li>
        </ul>
        <div className='underline'></div>
        <Suspense fallback={<Loading/>}>
          <div>
            <AssetsItem />
            <LiabilitiesItem />
            <CapitalItem />
            <ProfitItem />
          </div>
        </Suspense>          
      </main>
    )
  }
}

export default BankPage
