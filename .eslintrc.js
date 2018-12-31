module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "comma-dangle": ["error", "never"],
        "no-undef": 0,
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    }
}