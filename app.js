var config = require('./config/local/config');

config.forEach(function(item) {
  
  var record = {
    id: item.id,
    orderId: item.order_id,
    name: item.first_name,
    city: item.city,
    province: item.province,
    country: item.country,
    created: item.created_at
  };
  
  console.log(record);
});