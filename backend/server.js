var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var expressJwt = require("express-jwt");
var morgan = require("morgan");
var config = require('./config');

var app = express();
var port = process.env.PORT || 2000;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.use("/auth", require("./routes/auth"));
app.use("/user", expressJwt({secret: config.secret}), require("./routes/user"));

mongoose.connect(config.database, function (err) {
    if (err) throw err;
    console.log("Connected to database");
});

app.listen(port, function () {
    console.log("Now listening on port " + port);
});