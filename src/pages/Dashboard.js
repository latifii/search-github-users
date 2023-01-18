import React from 'react'
import { Info, Repos, User, Search, Navbar, Error } from '../components'
import loadingImage from '../images/preloader.gif'
import { useGlobalContext } from '../context/context'
const Dashboard = () => {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <Error />
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
