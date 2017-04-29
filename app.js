var express = require('express'),
   cloudant = require('cloudant'),
     config = require('./config/config');

var app = express();
app.use(function(req, res, next) {
  res.send('You Will Be Assimilated');
});
app.listen(config.app.port, function() {
  console.log('Express server listening on port ' + config.app.port);
})



console.log(config.db.credentials);
var conn = cloudant(config.db.credentials.url);
conn.db.create(config.db.doc.tanookiSuitData, function(err, res) {
  if (err)
    return console.log('Could not create new db: ' +
      config.db.doc.tanookiSuitData + ', it might already exist');
});
var db = conn.use(config.db.doc.tanookiSuitData);
console.log(db);
