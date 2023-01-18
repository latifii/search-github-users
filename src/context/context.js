import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [respo, setRespo] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchUser = async (user) => {
    toggleError()
    setLoading(true)
    const resp = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (resp) {
      setGithubUser(resp.data)
      const { login, followers_url } = resp.data

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          console.log('resuls promise', results)
          const status = 'fulfilled'
          const [respo, followers] = results
          if (respo.status === status) {
            setRespo(respo.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'not found user')
    }
    checkRequest()
    setLoading(false)
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }

  useEffect(() => {
    checkRequest()
  }, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        respo,
        followers,
        requests,
        loading,
        error,
        searchUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider }
