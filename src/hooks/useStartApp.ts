import { TokenResponse } from "expo-auth-session"
import * as SecureStore from "expo-secure-store"
import { useEffect, useState } from "react"

export const useStartApp = () => {
  const [authTokensFromSecureStore, setAuthTokensFromSecureStore] =
    useState<TokenResponse | null>(null)
  const fetchFromSecureStore = async () => {
    const authTokens = await SecureStore.getItemAsync("authTokens")
    if (authTokens) {
      setAuthTokensFromSecureStore(JSON.parse(authTokens))
    }
  }
  useEffect(() => {
    fetchFromSecureStore()
  }, [])

  return authTokensFromSecureStore
}
