import gene from "@pc/eslint/src/index.js";

export default gene(
  {
    react: true,
    typescript: true,
    formatters: true,
    type: "lib",
  },
  {
    ignores: ["fixtures", "_fixtures"],
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "perfectionist/sort-objects": "error",
    },
  },
);
