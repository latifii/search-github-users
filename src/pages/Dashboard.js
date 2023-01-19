import React from 'react'
import { Info, Repos, User, Search, Navbar, Loading } from '../components'

import { useGlobalContext } from '../context/context'
const Dashboard = () => {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <Loading />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  )
}

export default Dashboard
