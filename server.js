const express = require("express");

const cors = require("cors");

const app = express();

const dotenv = require("dotenv");

const authRoute = require("./routes/AuthRoute");

dotenv.config();

var bodyParser = require("body-parser");

const dbMongo = require("./modals");

//Configuration of database
dbMongo.mongoose
  .connect(dbMongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
