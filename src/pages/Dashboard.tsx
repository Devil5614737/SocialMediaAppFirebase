import React, { useContext } from 'react'
import { Navbar } from '../components/Navbar'
import { Posts } from '../components/Posts'


function Dashboard() {

  return (
    <>
    <Navbar/>
    <Posts/>
    </>
  )
}

export default Dashboard