import { useEffect, useState } from 'react'

const useToggleTheme = () => {
  const getStorageTheme = () => {
    let theme = 'light-theme'
    if(localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme')
    }
    return theme
  }
  const [ theme, setTheme ] = useState(getStorageTheme())
  const toggleTheme = () => {
    if(theme === 'light-theme'){
      setTheme('dark-theme')
    }else {
      setTheme('light-theme')
    }
  }
  useEffect(()=> {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  },[theme])

  return toggleTheme
}

export default useToggleTheme