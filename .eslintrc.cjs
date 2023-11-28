module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json", "./tsconfig.node.json"],
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "prettier"
    ],
    "rules": {
        "react/react-in-jsx-scope": ["off"],
        "react/jsx-uses-react": ["off"],
        "react/jsx-props-no-spreading": ["warn"],
        "react/no-unescaped-entities": ["off"]
    }
}
