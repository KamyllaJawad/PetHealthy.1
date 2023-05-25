const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors())
const port = process.env.PORT

app.use(express.urlencoded({ extended: false }));

require('./routes/index')(app)

app.listen(port, () => {
  console.log(`app in port ${port}`)
});