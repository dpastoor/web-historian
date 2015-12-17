let express = require('express');
let path = require('path');
let app = express();
app.get('/', (req, res) =>
  // res.sendfile takes an absolute path to a file and
  // sets the mime type based on the file extension
  // to resolve urls can also use the path module to manage proper '/' resolution
  res.sendFile(path.resolve(__dirname, '../client/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  })
  //don't need the error handling could also do
  // res.sendfile(__dirname = '/index.html')
);


var port = 3000;
app.listen(port, () => console.log('listening on http://localhost:' + port));
