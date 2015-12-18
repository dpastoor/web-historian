let redis = require('redis');
let request = require('request');
let _ = require('lodash');
let client = redis.createClient();
let getAndProcessHTML = function(siteKey) {
  client.get(siteKey, (err, value) => {
    let parsedValue = JSON.parse(value);
    let site = 'http://' + parsedValue.site;
    console.log(site)
    request(site, (err, res, body) => {
     if (err) {
       throw err;
     } else {
       parsedValue.queued = false;
       parsedValue.html = JSON.stringify(body);
       console.log('---value----');
       console.log(parsedValue);
       client.set(siteKey, JSON.stringify(parsedValue));
       console.log( 'processed' );
     }
   });
 });
};
client.get('toprocess', (err, value) => {
  let allValues = JSON.parse(value);
  console.log('----first value---')
  console.log(allValues[0])
  console.log('----starting to process HTML')
  getAndProcessHTML(allValues[0])
});
