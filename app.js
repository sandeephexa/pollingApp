  const express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const path = require("path");
  // bring config here
  require('./config/db');

  const app = express();

  const poll = require('./routes/poll');

// set public folder
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// enable cors
app.use(cors());

app.use('/poll',poll);
//const port = 3000;
app.listen(process.env.port || process.env.PORT || 3000, function () {
    console.log("listening");
});

// start server







