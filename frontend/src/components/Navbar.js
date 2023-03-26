import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo-image.svg'
import { FaBars, FaAngleDown, FaRegUser } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { useGlobalContext } from '../context'

const Navbar = ({ toggleTheme }) => {
  const { user, logoutUser } = useGlobalContext()
  const [ open, setOpen ] = useState(false)
  const [ showLinks, setShowLinks ] = useState(false)
  const linksContainerRef = useRef(null)
  const linksRef = useRef(null)
  const ref = useRef()

  const toggleUserLinks = () => {
    setOpen(!open)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    document.addEventListener("touchstart", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
      document.removeEventListener("touchstart", checkIfClickedOutside);
    }
  }, [open])

  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height
    if(showLinks){
      linksContainerRef.current.style.height = `380px`
    }else{
      linksContainerRef.current.style.height = '0px'
    }

  },[showLinks])

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link className='logo-item' to='/'>
            <img src={logo} alt='logo' className='logo' />
            <span>BanksUA</span>
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}><FaBars/></button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
            <div ref={linksRef}>
              <ul className='nav-links'>
                <li>
                  <Link to='/'>установи</Link>
                </li>
                <li>
                  <Link to='/tables'>таблиця</Link>
                </li>
                <li>
                  <Link to='/about'>про</Link>
                </li>
                <li>
                  <div className="toggle-container">

              {user ? (
                <div className='user-dropdown' ref={ref}>
                <button
                  style={{padding:'0.3rem 0'}}
                  className='btn btn-user'
                  onClick={toggleUserLinks}
                >
                  <FaRegUser/> {user.name} <FaAngleDown/>
                </button>
                {open ? (
                  <div>
                    <ul className='user-links'>
                        <li>
                          {user.email}
                        </li>
                        <li>
                          <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                          <Link to='/reviews'>Reviews</Link>
                        </li>
                        <li>
                          <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li
                          className='btn btn-user'
                          onClick={() => {
                            logoutUser()
                          }}
                        >Logout <FiLogOut/>
                        </li>
                    </ul>
                  </div>
                ):(null)}
                </div>
              ): (
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              )}
            </div>
                </li>
                <li>
                  <div className="toggle-theme-btn">
                    <input onChange={toggleTheme} type="checkbox" id="switch" name="theme" />
                   <label className='toggle-theme' htmlFor="switch"></label>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
