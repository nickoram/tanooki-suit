var data = require('./config/local/data'),
  moment = require('moment');

data.forEach(function(item) {

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

  console.log(record);
});
