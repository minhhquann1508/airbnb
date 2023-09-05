import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
export default function UserTemplate() {
  return (
    <>
        <Header/>
        <div className='pt-24'>
          <Outlet/>
        </div>
        <Footer/>
    </>
  )
}
