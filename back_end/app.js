// Authors: Joey Punzel, Patrick Furbert

//get .env information
require('dotenv').config();

// middleware
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

//configure app
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = 5000;

// Start express app
app.listen(port, () => {
  console.log(`Job Tracker Backend listening at http://localhost:${port}`);
});
