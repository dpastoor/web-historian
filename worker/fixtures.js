let _ = require('lodash');
let redis = require('redis');
let sites = {'google': {
                    queued: true,
                    site: 'www.google.com',
                    html: ''
             },
             'walmart' : {
                    queued: true,
                    site: 'www.walmart.com',
                    html: ''
              },
             'costco' : {
                    queued: true,
                    site: 'www.costco.com',
                    html: 'other text'
             },
             'facebook' : {
                    queued: true,
                    site: 'www.facebook.com',
                    html: 'more text'
              }
};

let client = redis.createClient();
let processFixtures = [];
_.forEach(sites, (s, key) => {
  client.set(key, JSON.stringify(s));
  processFixtures.push(key);
});
client.set('toprocess', JSON.stringify(processFixtures));
client.quit();
console.log('finished setting up fixtures')
