const config = {
  transformIgnorePatterns: ["cgt_react/node_modules/(?!axios)/"],
  moduleNameMapper: {
    "^axios$": require.resolve("axios"),
  },
};

export default config;
