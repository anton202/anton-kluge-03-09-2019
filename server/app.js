const express = require('express');
const app = express();
const path = require('path');


app.use(express.static(path.join('../weatherApp/dist/weatherApp')))

app.listen(8084,()=>console.log(8084))