import React from "react"
import LoginContextProvider from "./LoginContext"

interface ContextProvidersProps {
  children: React.ReactNode
}

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return <LoginContextProvider>{children}</LoginContextProvider>
}

export default ContextProviders
