import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useLocalState from '../utils/localState'
import FormRow from '../components/FormRow'
import axios from 'axios'

// import url from '../utils/url'

const Profile = () => {
  const {user, saveUser} = useGlobalContext()
  // const { name, userId, email, role, pic } = user
  const navigate = useNavigate()
  const [ values, setValues ] = useState({
    name: user?.name,
    // image: user?.pic,
    email: user?.email,
    role: user?.role,
    // cloudinary_id: user?.cloudinary_id
  })
  // const [ data, setData ] = useState({
  //   name: "",
  //   email:"",
  //   role:"",
  //   image: '',
  // })

  const {
    alert,
    showAlert,
    success,
    setSuccess,
    loading,
    setLoading,
    hideAlert
  } = useLocalState()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  // const handleChange = (name) => (e) => {
  //   const value = name === "image" ? e.target.files[0] : e.target.value;
  //   setValues({ ...values, [name]: value });
  // };

  // const onSubmit =async () => {
  //   setLoading(true)
  //   try {
  //     let formData = new FormData();
  //     // formData.append("image", values.image);
  //     formData.append("name", values.name);
  //     formData.append("email", values.email);
  //     formData.append("role", values.role);

  //     // const res = await fetch(`/user/${id}`, {
  //     //   method: "PUT",
  //     //   body: formData,
  //     // });
  //     // if (res.ok) {
  //     //   setValues({ name: "", image: "", email: "", role: "" });
  //     //   navigate("/");
  //     // }
  //     const res = await axios.put(`/api/v1/users/updateUser`, formData)      
  //     setValues(res.data);
  //     console.log(res.data);
  //     setValues({ name: "", email: "", role: "" });
  //     // saveUser(values.user)
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false)
  // }

  const onSubmit = async (e) => {
      e.preventDefault()
      hideAlert()
      setLoading(true)
      const { name, email,} = values
      const updatedUser = { name, email,}
       try {

        const { data } = await axios.put(
          `/api/v1/users/updateUser`,
          updatedUser
        )
        console.log(data);
        setValues({ name: '', email: '', })
        setSuccess(true)
        showAlert({ text: data.msg, type: 'success' })
        saveUser(data.user)
        navigate(`/dashboard`)
      } catch (error) {
        const { msg } = error.response.data
        showAlert({ text: msg || 'there was an error' })
      }
      setLoading(false)      
  }

  return (
    <>
    <Wrapper className='page'>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {!success && (
        <form className='form' onSubmit={onSubmit} encType="multipart/form-data">
          <h2>Welcome {user.name}'s Profile</h2>
          <img style={{height:'200px', width: "200px", borderRadius:'50%'}} src={user.pic} alt={user.name} />
          <FormRow
              type='text'
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type='email'
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            <label htmlFor='role' className='form-label'>
              role
            </label>
            <input
              type='text'
              name="role"
              disabled={true}
              value={values.role}
              onChange={handleChange}
              className='form-input'
            />
            <button type='submit' className='btn btn-block' disabled={loading}>
              {loading ? 'Loading...' : 'Save Changes'}
            </button>
        </form>
      )}
    </Wrapper>
    </>
  )
}
const Wrapper = styled.main`
  button {
    margin-top: 2rem;
  }
`
export default Profile
