var cloudant = (process.env.VCAP_SERVICES) ?
  JSON.parse(process.env.VCAP_SERVICES) : require('./local/cloudant');

module.exports = {
  app: {
    port: process.env.PORT || 8080,

  },
  db: {
    credentials: cloudant.cloudantNoSQLDB[0].credentials,
    doc: {
      tanookiSuitData: "tanooki-suit-data"
    }
  }
};
