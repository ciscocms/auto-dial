'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    participants: Array,
    cospace: String
});

var Config = mongoose.model("Config", ConfigSchema);

module.exports.Config = Config;
