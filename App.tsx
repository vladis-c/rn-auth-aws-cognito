import { NavigationContainer } from "@react-navigation/native"

import * as RootNavigation from "./src/navigation/root-navigation"
import MainNavigator from "./src/navigation/MainNavigator"
import ContextProviders from "./src/context/ContextProviders"

const App = () => {
  return (
    <ContextProviders>
      <NavigationContainer
        ref={RootNavigation.navigationRef}
        linking={RootNavigation.linking}
      >
        <MainNavigator />
      </NavigationContainer>
    </ContextProviders>
  )
}

export default App
