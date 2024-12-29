import baseConfig from "@pc/eslint/eslint.config.js";

export default [
  ...(await baseConfig),
];
