import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Login"
import Home from "../screens/Home"

const MainStack = createStackNavigator<any>()

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name={"Login"} component={Login} />
      <MainStack.Screen name={"Home"} component={Home} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
