var express = require('express'),
     config = require('./config/config');

var services = (process.env.VCAP_SERVICES) ?
  JSON.parse(process.env.VCAP_SERVICES) : require('./config/local/cloudant');

console.log(services.cloudantNoSQLDB);

var app = express();
app.use(function(req, res, next) {
  res.send('You Will Be Assimilated');
});
app.listen(config.app.port, function() {
  console.log('Express server listening on port ' + config.app.port);
})
