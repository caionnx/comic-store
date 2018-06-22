module.exports = {
  "extends": ["standard", "standard-react", "plugin:jest/recommended", "plugin:jsx-control-statements/recommended"],
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "react/jsx-no-undef": [2, { "allowGlobals": true }]
  },
  "plugins": ["jest", "jsx-control-statements"]
};
