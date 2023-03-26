import React, { useState, useEffect } from 'react'
import axios from 'axios';
import styled from "styled-components"
import { useGlobalContext } from "../context"
import { useNavigate } from 'react-router-dom'
import url from '../utils/url'

function Dashboard() {
  const [ count, setCount ] = useState(0)
  const [ reviews, setReviews ] = useState([])
  const { user, saveUser } = useGlobalContext()
  const { name, userId, email, role, pic } = user
  const navigate = useNavigate()

  const [ values, setValues ] = useState({
    pic: '',
  })


  useEffect(() => {
    async function getSingleUserReviews () {
      try {
        const response = await axios(`${url}/api/v1/users/${userId}/reviews`)
        const data = response.data
        setCount(data.count)
        setReviews(data.reviews)
      } catch (error) {
        console.log(error);
      }
    }
    getSingleUserReviews()
  },[userId])

  const handleImage = (e) => {
    setValues({...values, pic: e.target.files[0]})
  }

  const handleSubmit = async () => {
    try {
      // const { name, price, image } = values

        const formData = new FormData()
        formData.append("image", values.pic)
        // formData.append("name", values.name)
        // formData.append("price", values.price)

        const result = await axios.post(`${url}/api/v1/users/uploadUserImage`, formData)
        const { image } = result.data
        console.log(result.data);
        const newUser = { pic: image.src}
        await axios.put(`${url}/api/v1/users/updateUserImage`, newUser)
        setValues({ pic: '' })
        // saveUser()
        navigate(`/profile`)
    } catch (error) {
        console.log(error);
    }
  }
console.log(pic);
  return (
    <>
       <Wrapper className='page'>
       <div className='about-container'>
          <div className='about-section'>
            <img src={pic} alt={name} width={250} height={250}/>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
            />
            <button onClick={handleSubmit}>Submit</button>
            <div className='about-text'>
              <h1 className='section-title'>Hello there, {name}</h1>
              <p>
                Your Email : {email}
              </p>
              <p>
                Your Role : {role}
              </p>
              <p>
                Your Count of Reviews : {count}
              </p>
              <div className='underline'></div>
            </div>
          </div>
       </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Dashboard
