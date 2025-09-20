import React from 'react'
import Header from './Header'

function DashboardLayout({children}) {
  return (
    <>
    <Header/>
    {children}
    </>
  )
}

export default DashboardLayout