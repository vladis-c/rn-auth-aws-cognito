module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          allowUndefined: false,
          moduleName: "react-native-dotenv",
          verbose: false,
        },
      ],
    ],
  }
}
