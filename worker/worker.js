let redis = require('redis');
let request = require('request');
let _ = require('lodash');
let getAndProcessHTML = (client, siteKey, stopClient) => {
  client.get(siteKey, (err, value) => {
    let parsedValue = JSON.parse(value);
    let site = 'http://' + parsedValue.site;
    request(site, (err, res, body) => {
     if (err) {
       throw err;
     } else {
       parsedValue.queued = false;
       parsedValue.html = JSON.stringify(body);
       client.set(siteKey, JSON.stringify(parsedValue));
       console.log('done processing ' + siteKey );
      if (stopClient) {
        client.quit();
      }
     }
   });
 });
};

setInterval(() => {
  console.log('creating client');
  let client = redis.createClient();
  console.log('checking things to process');
  client.get('toprocess', (err, value) => {
    let allValues = JSON.parse(value);
    if (!allValues.length) {
        client.quit();
        return;
    } else {
      _.forEach(allValues, (value, i) => {
        let stopClient = false;
        if (i === (allValues.length - 1)) {
          stopClient = true;
        }
        getAndProcessHTML(client, value, stopClient);
      });
      client.set('toprocess', JSON.stringify([]));
      console.log('end of forEach loop!');
    }
  });
}, 2000);
