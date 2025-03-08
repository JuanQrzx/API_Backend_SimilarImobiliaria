import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];
rules: {
  "class-methods-use-this": "off",
  "no-param-reassing": "off",
  "camelcase": "off",
  "no-underscore-dangle": "off"
  "no-unused-vars": ["error", { "argsIgnorePattern": "next"}
  ]
}
