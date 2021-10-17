// Authors: Joey Punzel, Patrick Furbert

//get .env information
require('dotenv').config();

// middleware
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const routes = require("./routes");

const app = express();

//database connection
mongoose.connect("mongodb://localhost:27017/jobtracker", { useNewUrlParser: true })
.then(() => console.log("Connected to mongoDB, database jobtracker"))
.catch (console.error);

//configure app
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", routes);

const port = 5000;

// Start express app
app.listen(port, () => {
  console.log(`Job Tracker Backend listening at http://localhost:${port}`);
});
