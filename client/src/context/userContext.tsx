import { createContext, useEffect, useState } from 'react'

type User = {
  _id: string
  email: string
  name: string
}

export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true
})

type Props = {
  children: React.ReactNode
}

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const value = localStorage.getItem('buxtrack_user')
    if (value) {
      setUser(JSON.parse(value) as User)
    } else {
      setUser(null)
    }

    setLoading(false)
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
