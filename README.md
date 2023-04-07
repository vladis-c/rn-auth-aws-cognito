# Expo React Native App with AWS Cognito authentication

## Description

This is a simple app, with two screens `Login` and `Home`.
Uses typescript, react navigation, expo authentication

## Configuration

[LoginContext](src/context/LoginContext.tsx) file has environmental variables. Get those from your [Cognito](https://aws.amazon.com/cognito/) page.

To setup up [Cognito](https://medium.com/slalom-build/authorization-and-authentication-with-aws-cognito-and-react-native-6d2faa69ed94), follow this guide

## Installation

Make sure the _expo-cli_ is installed with `npm install -g expo-cli`

`yarn` to install dependencies

`npx expo start` to launch the server locally. Press `a` or `i` to launch on Android or Ios.
Make sure to be in the same network if you are using real devices, and download _Expo Go_ app

## Authentication

Authentication flow is completed in [LoginContext](src/context/LoginContext.tsx) file. Used [Expo Auth Cognito](https://docs.expo.dev/guides/authentication/#cognito) guide.
