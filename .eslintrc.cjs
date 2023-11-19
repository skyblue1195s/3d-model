module.exports = {
  "plugins": ["@typescript-eslint"],
  "extends": [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      // This will turn off eslint rules conflicting with prettier. This is not what will format our code
      "prettier"
  ],
  "rules": {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn"
  }
}

