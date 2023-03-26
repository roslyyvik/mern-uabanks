import React, {useEffect, useState} from 'react'
import {FaAngleUp} from 'react-icons/fa'
import classes from './TopButton.module.css'

const TopButton = () => {
  const [ showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
       window.addEventListener("scroll", () => {
           if (window.scrollY > 600) {
               setShowTopBtn(true);
           } else {
               setShowTopBtn(false);
           }
       });
   }, []);

  const goToTop = () => {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
      });
  };

  return (
    <>
      {showTopBtn && (
        <button
          className={`btn ${classes.btnScroll}`}
          onClick={goToTop}
        >
          <FaAngleUp/>
        </button>
      )}
    </>
  )
}

export default TopButton