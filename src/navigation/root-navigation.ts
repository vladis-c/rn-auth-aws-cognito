import {
  CommonActions,
  createNavigationContainerRef,
  LinkingOptions,
} from "@react-navigation/native"
import * as Linking from "expo-linking"

export const navigationRef = createNavigationContainerRef()

export const navigate = (name: any, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params))
  }
}

const prefix = Linking.createURL("/")
const config = {
  screens: {
    ["Login"]: "login",
    ["Home"]: "home",
  },
}
export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config,
}
