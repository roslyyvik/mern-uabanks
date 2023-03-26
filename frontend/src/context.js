import axios from 'axios';
import React, {useContext, useState, useEffect, useCallback } from 'react';
import url from './utils/url'

const AppContext = React.createContext();

const AppProvider = ({children}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [ banks, setBanks ] = useState([])
  const [ user, setUser ] = useState(null)

  const saveUser = (user) => {
    setUser(user)
  }

  const removeUser = () => {
    setUser(null)
  }

  const fetchUser = async () => {
    try {
      const {data} = await axios(`/api/v1/users/showMe`)
      saveUser(data.user)
    } catch (error) {
      removeUser()
    }
    setIsLoading(false)
  }

  const logoutUser = async () => {
    try {
      await axios.delete(`/api/v1/auth/logout`)
      removeUser()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser()
    //eslint-disable-next-line
  },[])

  // const getBanks = useCallback( async () => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios(`/api/v1/banks`)
  //     const { banks } = response.data
  //     if(banks){
  //       const newBanks = banks.map((item) => {
  //         const {
  //           MFO,
  //           SHORTNAME,
  //           KOD_EDRPOU,
  //           group,
  //           NP,
  //           ADRESS,
  //           P_IND,
  //           assetstotal,
  //           liabilities,
  //           capitaltotal,
  //           profittotal,
  //         } = item
  //         return {
  //           mfo: MFO,
  //           brand: SHORTNAME,
  //           kod: KOD_EDRPOU,
  //           group,
  //           np: NP,
  //           adress: ADRESS,
  //           postindex: P_IND,
  //           assetstotal,
  //           liabilities,
  //           capitaltotal,
  //           profittotal,
  //         }
  //       })
  //       setBanks(newBanks)
  //     } else {
  //       setBanks([])
  //     }
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //     setIsLoading(false)
  //   }
  // },[])

  // useEffect(()=>{
  //   getBanks()
  // },[getBanks])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        // banks,
        saveUser,
        user,
        logoutUser
      }}
    >
      { children }
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider }
