import { useContext } from 'react'
import { userContext } from '../contexts/UserContext'

export const useUserContext = () => {
  const context = useContext(userContext)

  return context
}