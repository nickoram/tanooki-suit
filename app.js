var services = (process.env.VCAP_SERVICES) ?
  JSON.parse(process.env.VCAP_SERVICES) : require('./config/local/cloudant');

console.log(services.cloudantNoSQLDB);
