import React from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import useAuthentication from "../hooks/useAuthentication"

const Home = ({ navigation }: any) => {
  const Authentication = useAuthentication(() => navigation.navigate("Login"))
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={() => Authentication.logout()} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
