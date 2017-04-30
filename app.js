var express = require('express'),
   cloudant = require('cloudant'),
    request = require('request'),
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



var url = "https://notifyapp.io/js-obj/e733b96313b6a19596854f09f8794535-31849/1/1/caches.js";
request(url, function(error, response, body) {
  if (error)
      return console.log('Request failed:' + error)

  var regex = /notifyAppIo\.setup\((.*?)\)/g;
  var match = regex.exec(body);
  var result = eval(match[1]);
  result.forEach(function(item) {
    console.log({
      id: item.id,
      name: item.first_name,
      timestamp: item.created_at
    });
  });
});
