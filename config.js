config = {
    cmsHost: process.env.CMS_HOST || "cms.empire.net:444",
    cmsApiUsername: process.env.CMS_API_USERNAME || "user",
    cmsApiPassword: process.env.CMS_API_PASSWORD || "pass",
    apiPort: process.env.API_PORT || "8444",
    mongoHost: process.env.MONGO_HOST || "localhost:27017"
};

module.exports = config;
