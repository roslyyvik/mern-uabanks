import React, { useEffect, useState } from 'react'

const Alert = () => {
  const [ showAlert, setShowAlert ] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(!showAlert)
    },1000)
  // eslint-disable-next-line
  },[])

  return (
    <div className='alert-container'>
      {showAlert && (
      <p className='alert-item'>Перевірте назву та/або приналежність до групи</p>
    )}
    </div>
  )
}

export default Alert