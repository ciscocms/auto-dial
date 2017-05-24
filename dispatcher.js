var cms = require('./cms');
var Config = require("./models").Config;

function switchOntype(record) {
    switch (record.$.type){
        case "callStart":
            console.log(`Received callStart record for call: ${record.call.$.id} cospace: ${record.call.cospace}`);
            //console.log(record); //uncomment to inspect CDR object
            getParticipantsForCoSpace(record);
            break;
        case "callEnd":
            console.log("Received callEnd record");
            break;
        default:
            console.log("Ignoring record with type:", record.$.type);
    };
};

function callParticipants(record, participants) {
    participants.forEach(function(participant) {
        cms.dialOut(record.call.$.id, participant);
    });
};

function getParticipantsForCoSpace(record) {
    var cospace = record.call.cospace;
    console.log("Getting participants for cospace:", cospace)
    Config.findOne({cospace: cospace}, function(err, config){
        if (config) {
            //console.log(config); //uncomment to inspect config object returned from mongodb
            callParticipants(record, config.participants);
        } else {
            console.log(`No config found for cospace: ${cospace}`)
        }
    });
};

parseCdr = function(data) {
    if (Array.isArray(data.records.record)) {
        data.records.record.forEach(function(record) {
            switchOntype(record);
        });
    } else {
        switchOntype(data.records.record);
    };
};

module.exports = {parseCdr: parseCdr};
