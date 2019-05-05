module.exports = {
  extends: [
    "plugin:vue-libs/recommended"
  ],
  plugins: [
    "node",
    "import",
    "standard",
    "promise",
    "vue"
  ],
  parserOptions: {
      "sourceType": "module",
      "ecmaFeatures": {}
  },
  env: {
    "browser": true,
    "node": true
  },
  globals: {
    "document": false,
    "window": true,
    "define": true,
    "self": true,
  },
  rules: {
    "indent": ["error", 2, {
      "MemberExpression": "off"
    }],
    "node/no-extraneous-require": ["error", {
      "allowModules": [
        "@vue/cli-test-utils"
      ]
    }],
    "no-console": 1,
    "no-multi-spaces": 0,
    "no-multiple-empty-lines": 0,
    "eqeqeq": 1
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js', "**/cli-test-utils/**/*.js"],
      rules: {
        "node/no-extraneous-require": "off"
      }
    }
  ]
};
