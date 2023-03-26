import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import useToggleTheme from './hooks/useToggleTheme'
import TopButton from './ui/button/TopButton'
import { useGlobalContext } from './context'

import {
  About,
  BankPage,
  BanksTable,
  Home,
  Error,
  Register,
  Login,
  Verify,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
  Profile,
  Reviews,
  SingleBankReviews,
  AddReview,
  ReviewsList,
  EditReview,
} from './pages';

function App() {
  const toggleTheme = useToggleTheme()
  const { isLoading } = useGlobalContext()

  if(isLoading) {
    return (
      <section className='page page-center'>
        <div className='loading'></div>
      </section>
    )
  }

  return (
    <BrowserRouter>
      <Navbar toggleTheme={toggleTheme}/>
      <TopButton/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/reviewslist' element={<ReviewsList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/editreview/:id' element={<EditReview />} />
          <Route path='/addreview/:id' element={<AddReview />} />
        </Route>
        <Route path='/bank/:mfo' element={<BankPage />} />
        <Route path='/bank/:mfo/reviews' element={<SingleBankReviews />} />
        <Route path='/tables' element={<BanksTable />} />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/user/verify-email' element={<Verify/>}/>
        <Route path='/user/reset-password' element={<ResetPassword/>}/>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
