let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();

let sites = {'google': {
                    queued: false,
                    site: 'www.google.com',
                    html: ''
             },
             'walmart' : {
                    queued: false,
                    site: 'www.google.com',
                    html: ''
              }
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/:site', (req, res) =>
  res.json(sites)
);


var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
