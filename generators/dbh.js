const DBH_CONSTANTS = require('./dbh-constants');
const fs = require('fs');

/** return the content of .yo-rc.json as a JSON object */
const getAppConfig = directory => new Promise((resolve, reject) => {
    const path = directory + DBH_CONSTANTS.appConfigFile;
    // if file exists, return its output as a JSON object
    if (fs.existsSync(path)) {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(new Error(err));
            }
            const appConfigToJson = JSON.parse(data);
            if (appConfigToJson) {
                resolve(appConfigToJson);
            } else {
                reject(new Error(`getAppConfig: no output. Type: ${typeof appConfigToJson}, value: ${appConfigToJson}`));
            }
        });
    } else {
        reject(new Error(`getAppConfig: file ${path} not found`));
    }
});


/** assert parameter is a non-empty string */
const isTrueString = x => (typeof x === 'string' && x !== '');


module.exports = {
    getAppConfig,
    isTrueString
};
