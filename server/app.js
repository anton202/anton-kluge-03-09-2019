const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const path = require('path');

app.use(express.static(path.join('../weatherApp/dist/weatherApp')))

https.createServer({
    key: fs.readFileSync('/root/encryption/server.key'),
    cert: fs.readFileSync('/root/encryption/server.cert')
  }, app)
  .listen(8084)
