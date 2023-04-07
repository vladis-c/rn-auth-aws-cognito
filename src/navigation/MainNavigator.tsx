import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "../screens/Login"
import Home from "../screens/Home"
import { MAIN_NAV, MainNavParamList } from "./navigation-types"

const MainStack = createStackNavigator<MainNavParamList>()

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name={MAIN_NAV.LOGIN} component={Login} />
      <MainStack.Screen name={MAIN_NAV.HOME} component={Home} />
    </MainStack.Navigator>
  )
}

export default MainNavigator
