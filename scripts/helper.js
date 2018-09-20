const { serviceConfig } = require('../contentfactory-ibm-cbs');
const { deploymentmanager_v1 } =  require('googleapis');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const { generate } = require('randomstring')
const GCP_AUTH_SCOPE = [
    "https://www.googleapis.com/auth/compute",
    "https://www.googleapis.com/auth/cloud-platform"
];
const getAuth = async () => {
    return new Promise((resolve, reject)=>{
           try {
               const auth = new JWT(
                   serviceConfig.client_email,
                   null,
                   serviceConfig.private_key, GCP_AUTH_SCOPE, // an array of auth scopes
                   null
               );
               resolve(auth);
           } catch(E) {
               reject(E)
           }

        })

}

const getConfig = async (resource) => {
    const authClient = await getAuth();
    const pythonContent = fs.readFileSync(`./deployConfigs/${resource}/${resource}.py`).toString();
    const yamlContent = fs.readFileSync(`./deployConfigs/${resource}/${resource}.yaml`).toString();
    const schemaContent = fs.readFileSync(`./deployConfigs/${resource}/${resource}.schema`).toString();

    const request = {
        // The project ID for this request.
        project: serviceConfig.project_id,
        resource: {
            "target": {
                "imports": [{
                    "name": resource + ".py",
                    "content": pythonContent
                },
                    // {
                    //     "name": resource + ".py.schema",
                    //     "content": schemaContent
                    // }
                ],
                "config": {
                    "content": yamlContent
                }
            },
            "name": `chetan-${(generate(7).toString().toLowerCase())}`
        },
        auth: authClient
    };
    // console.log(request);
    return request;
}

module.exports.getConfig = getConfig;