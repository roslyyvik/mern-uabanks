import React from 'react'
import logo from '../assets/images/unnamed.jpg'

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-section'>
        <img src={logo} alt='me' className='' />
        <div className='about-text'>
          <h1 className='section-title'>About Myself</h1>
          <p>
            HELLO, I'M VIKTOR, I'M FROM UKRAINE AND LIVE IN CHERNIHIV.
            I AM NEW AS A WEB DEVELOPER AND TO UPWORK ALSO . I INTEND TO USE THIS PLATFORM,
            TO HELP YOU CREATE YOUR WEB ASSETS USING SUCH TOOL FOR CREATING UI COMPONENTS AS REACT.
            THIS PROJECT DESIGNED AND CREATED BY MYSELF, THAT REQUEST DATA FROM THE API (BY THE WAY, ALSO CREATED BY MYSELF USING NODEJS,MONGODB) AND DISPLAYS IT THROUGH DIAGRAMS AND TABLES.
            I HAVE AN INTERMEDIATE LEVEL OF ENGLISH AND I HOPE TO COMMUNICATE EFFECTIVELY WITH YOU TO UNDERSTAND THE FEATURES OF YOUR PROJECTS.
            READY TO START WITH SIMPLE TASKS.
          </p>
          <p>RESPECTFULLY, VIKTOR</p>
          <div className='underline'></div>
        </div>
      </div>
    </div>
  )
}

export default About