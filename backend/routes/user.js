var express = require("express");
var authRoutes = express.Router();
var User = require("../models/users");
var jwt = require("jsonwebtoken");
var config = require("../config");

authRoutes.get("/login", function (req, res) {
    console.log(req.headers);
    User.findOne({
        username: req.headers.username,
    }, function (err, user) {
        if (err) res.status(500).send(err);
        if (!user) return res.json({
            success: false,
            message: "Username not found"
        });
        user.checkPassword(req.headers.password, function (err, isMatch) {
            if (err) res.status(403).send(err);
            if (!isMatch) return res.json({
                success: false,
                message: "Incorrect password"
            });
            var token = jwt.sign(user.toObject(), config.secret, {
                expiresIn: "6h"
            });
            res.json({
                token: token,
                user: user.withoutPassword(),
                success: true,
                message: "User logged in"
            })
        });
    });
});


authRoutes.post("/signup", function (req, res) {
    var newUser = new User(req.body);
    User.find({
        username: newUser.username
    }, function (err, existingUser) {
        if (err) res.status(500).send(err);
        if (existingUser.length) res.send({
            success: false,
            message: "Username already taken"
        });
        else {
            newUser.save(function (err, newUser) {
                if (err) return res.status(500).send(err);
                res.status(201).send({
                    user: newUser,
                    message: "User added"
                });
            });

        }
    })

});

module.exports = authRoutes;