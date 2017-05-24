'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");
var logger = require("morgan");

var jsonParser = require("body-parser").json;
var mongoose = require("mongoose");
var xmlparser = require("express-xml-bodyparser");
var config = require("./config");

app.use(logger("dev"));
app.use(jsonParser());
app.use(xmlparser({explicitArray: false}));
app.use("/api", routes);

// Database stuff
mongoose.connect(`mongodb://${config.mongoHost}/autodb`);
var db = mongoose.connection;
db.on("error", function(err){
    console.error("Connection error:", err);
});
db.once("open", function(){
    console.log("DB connection successful");
});

// Catch 404
app.use(function(req, res, next){
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }

    });
    console.log(err);
});

// Configure and run server
var port = process.env.PORT || config.apiPort;

app.listen(port, function(){
    console.log("Express server is listening on port", port)
});
