'use client'

import { useEffect, useState } from 'react'

export default function CreateButton() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
  useEffect(() => {
    const token = document.cookie.split(';').find((cookie) => cookie.includes('payload-auth-token'))
    console.log('TOKEN', token)
    setIsLoggedIn(!!token)
  }, [])

  if (isLoggedIn === undefined) return <div>Loading...</div>

  return (
    <button
      onClick={() => {
        console.log('CLICKED')
        if (isLoggedIn) {
          document.cookie = 'payload-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          return setIsLoggedIn(false)
        }
        document.cookie = 'payload-auth-token=1234'
        setIsLoggedIn(true)
      }}
    >
      {isLoggedIn ? 'Sign out' : 'Log In'}
    </button>
  )
}
