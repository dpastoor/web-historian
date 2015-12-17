let express = require('express');
let path = require('path');
let app = express();


app.use(express.static('client'));

app.get('/', (req, res) =>
   console.log(req)
);


var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
