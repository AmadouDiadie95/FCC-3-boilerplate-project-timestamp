// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api', function(req, res) {

  var now = new Date();
  res.send({ "unix": now.getTime(), "utc": now.toUTCString() })
})

app.get('/api/:date_string', function(req, res) {

  var input_date = req.params.date_string;

  console.log(input_date);

  if (isNaN(input_date)) {
    input_date = new Date(input_date);
  } else {
    input_date = new Date(parseInt(input_date));
  }

  var result = { "error": "Invalid Date" };

  if (input_date.getTime()) {
    result = { "unix": input_date.getTime(), "utc": input_date.toUTCString() }
  }

  console.log(result);

  res.send(result);
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
