const express = require("express");

const cors = require("cors");

const app = express();

const path = require("path");

const dotenv = require("dotenv");

const authRoute = require("./routes/AuthRoute");

const huntRoute = require("./routes/huntRoute");

const recordsRoute = require("./routes/recordsRoute");

dotenv.config();

var bodyParser = require("body-parser");

const dbMongo = require("./modals");

//Configuration of database
dbMongo.mongoose
  .connect(process.env.APP_DB, {
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

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/auth", authRoute);

app.use("/hunts", huntRoute);

app.use("/records", recordsRoute);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname + "/privacy.html"));
});

app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
