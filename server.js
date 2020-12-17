const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

dotenv.config();

var bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
