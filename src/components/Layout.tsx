import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='min-h-creen flex flex-col bg-gray-500'>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

// 768px -> des, mobile

export default Layout