import { useFocusEffect } from "@react-navigation/native"
import { useContext, useCallback } from "react"
import { LoginContext, LoginProps } from "../context/LoginContext"

const useAuthentication = (callback: () => void) => {
  const { logout, isLoggedIn } = useContext(LoginContext) as LoginProps

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        callback()
      }
    }, [isLoggedIn, callback])
  )
  return { logout }
}

export default useAuthentication
