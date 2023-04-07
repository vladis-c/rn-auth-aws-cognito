import React, { useContext } from "react"

import { Button, View, StyleSheet, Text } from "react-native"
import { LoginContext, LoginProps } from "../context/LoginContext"

const Login = () => {
  const { authTokens, logout, promptAsync } = useContext(
    LoginContext
  ) as LoginProps

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {authTokens ? (
        <Button title="Logout" onPress={() => logout()} />
      ) : (
        <Button title="Login" onPress={() => promptAsync()} />
      )}
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
