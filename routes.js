'use strict';

var express = require("express");
var router = express.Router();
var Config = require("./models").Config;
var util = require("util");
var dispatcher = require("./dispatcher")

router.param("cID", function(req, res, next, id){
    Config.findById(id, function(err, doc) {
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        req.config = doc;
        return next();
    });
});

// GET all configs
router.get("/configs", function(req, res, next){
    Config.find({})
                .sort({createdAt: -1})
                .exec(function(err, configs){
                    if(err) return next(err);
                    res.json(configs);
                });
});

// POST a new config
router.post("/configs", function(req, res, next){
    var config = new Config(req.body);
    config.save(function(err, config){
        if(err) return next(err);
        res.status(201);
        res.json(config);

    });
});

// GET a specific config
router.get("/configs/:cID", function(req, res, next){
    res.json(req.config)
})

// PUT update a specific config
router.put("/configs/:cID", function(req, res){
    req.config.update(req.body, function(err, result){
        if(err) return next(err);
        res.json(result);
    });
});

// DELETE a specific config
router.delete("/configs/:cID", function(req, res){
    req.config.remove(function(err){
        if(err) return next(err);
        res.json({"message": "ok"})
    });
});

// CDR receiver
router.post("/cdr", function(req, res, next) {
    //console.log(util.inspect(req.body, false, null)); //uncomment to inspect the incoming request object
    
    // Send to parser to see if we need to work on this CDR message
    dispatcher.parseCdr(req.body);

    // Return an empty 200 OK
    res.status(200);
    res.send("");
});

module.exports = router;
