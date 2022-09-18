module.exports = {
    "plugins": [
      "react",
      "react-native"
    ],
    "parser": '@typescript-eslint/parser', // Specifies the ESLint parser
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "react-native/react-native": true
      },
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react-native/no-raw-text": 2,
        "react-native/no-single-element-style-arrays": 2,
      }
  }