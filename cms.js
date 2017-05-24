var request = require('request');
var config = require("./config");

dialOut = function(callid, participant){
    console.log(`Adding participant ${participant} to call ${callid}`);

    var formData = {
        remoteParty: participant
    }

    var options = {
        url: `https://${config.cmsHost}/api/v1/calls/${callid}/callLegs`,
        strictSSL: false,
        auth: {
            username: config.cmsApiUsername,
            password: config.cmsApiPassword
        },
        form: formData
    };

    request.post(options , function (error, response, body) {
        console.log("Sending POST to CMS API:", response && response.statusCode);
    });

}

module.exports = {dialOut: dialOut};
