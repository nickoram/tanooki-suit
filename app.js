var express = require('express'),
   cloudant = require('cloudant'),
    request = require('request'),
     moment = require('moment'),
      async = require('async'),
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
var index = {
  name: 'id',
  type: 'json',
  index: {
    fields: ['id']
  }
};
db.index(index, function(error, response) {
  if (error)
    throw error;
  console.log("Index creation result: %s", response.result);
});
db.index(function(error, response) {
  if (error)
    throw error;
  console.log('The database has %d indexes', response.indexes.length);
  for (var i = 0; i < response.indexes.length; i++) {
    console.log('  %s (%s): %j', response.indexes[i].name, response.indexes[i].type, response.indexes[i].def);
  }
});

var insert = function(record) {
  db.find({selector: {id: record.id}}, function(error, response) {

    if (error) {
      console.log(error);
      throw error;
    }
    if (!response.docs.length) {
      console.log("no record found");
      db.insert(record, function(err, data) {
        if (err)
          throw err;
        console.log(data);
      });
    } else {
      console.log("record found");
    }
  });
};

var beta = function() {
  var url = "https://notifyapp.io/js-obj/e733b96313b6a19596854f09f8794535-31849/2592000/" +
    moment().format('X') +
    "/caches.js";
  var records = [];

  console.log("\nretrieve attempt: " + moment().format("YYYY-MM-DD HH:mm:ss Z"))
  request(url, function(error, response, body) {
    if (error)
        return console.log('Request failed:' + error)

    var regex = /notifyAppIo\.setup\((.*?)\)/g;
    var match = regex.exec(body);
    var result = eval(match[1]);
    var records = [];

    result.forEach(function(item) {

      var mom = moment.unix(item.created_at).utc();

      var record = {
        id: item.id,
        orderId: item.order_id,
        variantId: item.variant_id,
        variant: item.variant_name,
        name: item.first_name,
        city: item.city,
        province: item.province,
        country: item.country,
        created: item.created_at,
        moment: {
          date: mom.format("YYYY-MM-DD HH:mm:ss Z"),
          year: mom.format("YYYY"),
          month: mom.format("MMMM"),
          quarter: mom.format("Q"),
          day: mom.format("dddd"),
          time: mom.format("h:mm:ss a")
        }
      };

      var func = function(callback) {
        setTimeout(function() {
          insert(record);
          callback(null, 1);
        }, 1000);
      };
      records.push(func);
    });

    async.parallelLimit(
    records,
    1,
    function(err, results) {
      console.log("done finnally gowd");
    });
  });
}

beta();
setInterval(beta, 5 * 60 * 1000);
