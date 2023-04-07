import type { NativeStackScreenProps } from "@react-navigation/native-stack"

type ObjectValues<T> = T[keyof T]

// Screens lists (const)

/**
 * The followng constant-type pairs are analogue of Typescript Enums.
 * For the navigation:
 * the constants in CAPITAL letters are the names of screens to be set in the navigation;
 * the type pair is for use if you create other type or interface with it to reference.
 */

/** */
export const MAIN_NAV = {
  LOGIN: "Login",
  HOME: "Home",
} as const
export type MainNavPages = ObjectValues<typeof MAIN_NAV>

// Navigatior Params List

/** Main navigator, which holds all the navigators inside */
export type MainNavParamList = {
  [MAIN_NAV.LOGIN]: undefined
  [MAIN_NAV.HOME]: undefined
}

// Navigation Props
export type LoginPageProps = NativeStackScreenProps<MainNavParamList, "Login">
export type HomePageProps = NativeStackScreenProps<MainNavParamList, "Home">
