let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');
let app = express();
let sites = {'google': {
                    queued: false,
                    site: 'www.google.com',
                    html: ''
             },
             'walmart' : {
                    queued: false,
                    site: 'www.walmart.com',
                    html: ''
              },
             'costco' : {
                    queued: false,
                    site: 'www.costco.com',
                    html: 'other text'
              }
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.param('sites', (req, res, next, site) => {
  if (sites[site]) {
    req.site = sites[site];
    next();
  } else {
    res.status(404).sendFile(path.resolve(__dirname, "../client/404notfound.html"));
  }
});

app.get('/:sites', (req, res) => {
  if (req.site.html === '') {
    res.sendFile(path.resolve(__dirname, "../client/robotsearch.html"));
  } else {
    res.json(req.site);
  }
});


var port = 3001;
app.listen(port, () => console.log('listening on http://localhost:' + port));
