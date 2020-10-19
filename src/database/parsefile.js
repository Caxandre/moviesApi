module.exports = {
  config: {
    databaseURI: process.env.PARSE_DATABASE_URI,
    appId: process.env.PARSE_APP_ID,
    masterKey: process.env.PARSE_MASTER_KEY,
    serverURL: process.env.PARSE_SERVER_URL,
  },
};
