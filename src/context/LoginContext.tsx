import React, { createContext, useEffect, useMemo, useState } from "react"
import * as SecureStore from "expo-secure-store"
import {
  //@ts-ignore
  COGNITO_CLIENT_ID,
  //@ts-ignore
  COGNITO_USER_POOL_URL,
  //@ts-ignore
  COGNITO_REDIRECT_URL,
} from "react-native-dotenv"
import * as WebBrowser from "expo-web-browser"
import {
  useAuthRequest,
  exchangeCodeAsync,
  revokeAsync,
  ResponseType,
  TokenResponse,
  AccessTokenRequestConfig,
  DiscoveryDocument,
  AuthRequestPromptOptions,
  AuthSessionResult,
} from "expo-auth-session"
import { Alert } from "react-native"
import { useStartApp } from "../hooks/useStartApp"

export interface LoginProps {
  isLoggedIn: boolean
  signinSignup: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>
  logout: () => Promise<void>
  authTokens: TokenResponse | null
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  setAuthTokens: React.Dispatch<React.SetStateAction<TokenResponse | null>>
  refreshToken: () => Promise<void>
}

interface LoginContextProviderProps {
  children: React.ReactNode
}

export const LoginContext = createContext<LoginProps | null>(null)

WebBrowser.maybeCompleteAuthSession()

const clientId: string = COGNITO_CLIENT_ID || process.env.COGNITO_CLIENT_ID
const userPoolUrl: string =
  COGNITO_USER_POOL_URL || process.env.COGNITO_USER_POOL_URL
const redirectUri: string =
  COGNITO_REDIRECT_URL || process.env.COGNITO_REDIRECT_URL

const LoginContextProvider = ({ children }: LoginContextProviderProps) => {
  const authTokensFromSecureStore = useStartApp()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [authTokens, setAuthTokens] = useState<TokenResponse | null>(null)
  const discoveryDocument = useMemo<DiscoveryDocument>(
    () => ({
      authorizationEndpoint: userPoolUrl + "/oauth2/authorize",
      tokenEndpoint: userPoolUrl + "/oauth2/token",
      revocationEndpoint: userPoolUrl + "/oauth2/revoke",
    }),
    []
  )

  const [request, response, signinSignup] = useAuthRequest(
    {
      clientId,
      responseType: ResponseType.Code,
      redirectUri,
      usePKCE: true,
    },
    discoveryDocument
  )

  const logout = async (): Promise<void> => {
    try {
      const revokeResponse = await revokeAsync(
        {
          clientId: clientId,
          token: authTokens?.refreshToken as string,
        },
        discoveryDocument
      )
      if (revokeResponse) {
        setAuthTokens(null)
      }
    } catch (error) {
      console.error(error)
      setAuthTokens(null)
    }
  }

  const refreshToken = async (): Promise<void> => {
    try {
      if (authTokens?.shouldRefresh()) {
        const refreshResponse = await authTokens.refreshAsync(
          { clientId },
          discoveryDocument
        )
        setAuthTokens(refreshResponse)
      }
    } catch (error) {
      console.error(error)
      setAuthTokens(null)
    }
  }

  useEffect(() => {
    if (authTokensFromSecureStore) {
      setAuthTokens(authTokensFromSecureStore)
    }
  }, [authTokensFromSecureStore])

  useEffect(() => {
    const exchangeFn = async (
      exchangeTokenReq: AccessTokenRequestConfig
    ): Promise<void> => {
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(
          exchangeTokenReq,
          discoveryDocument
        )
        setAuthTokens(exchangeTokenResponse)
      } catch (error) {
        console.error(error)
        setAuthTokens(null)
      }
    }
    if (response?.type === "error") {
      Alert.alert(
        "Authentication error",
        response.params.error_description || "something went wrong"
      )
      return
    }
    if (response?.type === "success") {
      exchangeFn({
        clientId,
        code: response.params.code,
        redirectUri,
        extraParams: {
          code_verifier: request?.codeVerifier as string,
        },
      })
    }
  }, [discoveryDocument, request, response])

  useEffect(() => {
    console.log("authTokens: " + JSON.stringify(authTokens))
    if (authTokens) {
      SecureStore.setItemAsync("authTokens", JSON.stringify(authTokens))
      setIsLoggedIn(true)
    } else {
      SecureStore.deleteItemAsync("authTokens")
      setIsLoggedIn(false)
    }
  }, [authTokens])

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setAuthTokens,
        setIsLoggedIn,
        signinSignup,
        logout,
        authTokens,
        refreshToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider
