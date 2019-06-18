const express = require("express"),
           bp = require("body-parser"),
      DB_NAME = "themernstore",
         cors = require("cors"),
          app = express(),
         port = 8000;

// app.use(express.static(__dirname + "/static"));
app.use(cors());
app.use(bp.json());

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});