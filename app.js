const { getConfig } = require("./scripts/helper");
const google = require('googleapis')
const options = process.argv;
const resource = options[2];
let config = {};
getConfig(resource).then((config)=> {
    const googleApis = new google.GoogleApis();
    const deploymentManager = googleApis.deploymentmanager('v2');
    console.log(JSON.stringify(config));
   deploymentManager.deployments.insert(config).then(data => console.log(data));
});

