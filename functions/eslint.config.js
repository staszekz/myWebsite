const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
    },
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      eqeqeq: ["warn", "always"],
      "import/no-deprecated": "warn",
      "import/no-duplicates": "error",
      "no-duplicate-case": "error",
      "no-var": "warn",
      "prefer-const": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
    },
  },
];
