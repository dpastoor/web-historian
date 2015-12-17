let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();


app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>
   console.log(req)
);


var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
