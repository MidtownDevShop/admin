var express = require("express");
var userRoute = express.Router();
var User = require("../models/users");
var jwt = require("jsonwebtoken");
var config = require("../config");


userRoute.get("/getInfo", function (req, res) {
    var query = User.findOne({
        username: req.headers.username
    });
    query.exec(function (err, user) {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
});

module.exports = userRoute;