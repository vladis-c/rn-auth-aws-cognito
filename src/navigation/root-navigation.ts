import { LinkingOptions } from "@react-navigation/native"
import * as Linking from "expo-linking"
import { MAIN_NAV } from "./navigation-types"

const prefix = Linking.createURL("/")
const config = {
  screens: {
    [MAIN_NAV.HOME]: "home",
  },
}
export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix],
  config,
}
