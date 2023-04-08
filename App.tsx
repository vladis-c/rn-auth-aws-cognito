import { NavigationContainer } from "@react-navigation/native"

import * as RootNavigation from "./src/navigation/root-navigation"
import MainNavigator from "./src/navigation/MainNavigator"
import ContextProviders from "./src/context/ContextProviders"
import { LogBox } from "react-native"

LogBox.ignoreLogs([
  "Provided value to SecureStore is larger than 2048 bytes. An attempt to store such a value will throw an error in SDK 35.",
  "Linking requires a build-time setting `scheme` in the project's Expo config (app.config.js or app.json) for production apps, if it's left blank, your app may crash. The scheme does not apply to development in the Expo client but you should add it as soon as you start working with Linking to avoid creating a broken build. Learn more: https://docs.expo.dev/guides/linking/",
])
const App = () => {
  return (
    <ContextProviders>
      <NavigationContainer linking={RootNavigation.linking}>
        <MainNavigator />
      </NavigationContainer>
    </ContextProviders>
  )
}

export default App
