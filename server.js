const express = require("express");
const mongoose = require("mongoose");
const app = express();
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");
const cronjob = require("./routes/cron/cron");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dbmysql = require("/config/mysql");
const dbpostgres = require("/config/postgres");
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect mongoose

mongoose
  .connect(db)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(err => console.log(err));

//connect mysql

dbmysql.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database mysql');
});
global.dbmysql = dbmysql;


//connect postgre sql

const dbpostgresql = dbpostgres(cn); // database instance;

app.use(passport.initialize());

require("./config/passport")(passport);
app.use("/api/scheduler", cronjob);
app.use("/api/admin", admin);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_env === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
