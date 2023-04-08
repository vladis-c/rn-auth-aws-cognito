import React, { useCallback, useContext } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Button, View, StyleSheet, Text } from "react-native"

import { LoginContext, LoginProps } from "../context/LoginContext"
import { LoginPageProps, MAIN_NAV } from "../navigation/navigation-types"
import { useStartApp } from "../hooks/useStartApp"

const Login = ({ navigation }: LoginPageProps) => {
  const { signinSignup, isLoggedIn } = useContext(LoginContext) as LoginProps


  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        navigation.replace(MAIN_NAV.HOME)
      }
    }, [isLoggedIn])
  )

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Login" onPress={() => signinSignup()} />
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
