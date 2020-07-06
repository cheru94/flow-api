const request = require('request');

/**
 * @param {Object} options Object with the properties for the request
 * @returns Returns a promise with the resolvement of the request or the failure
 */
const getExecution = async (options) => {
    try {
        return await executor(options);
    } catch (error) {
        return error;        
    }
};

/**
 * 
 * @param {Object} options 
 * @returns Returns a promise with the resolvement of the request or the failure
 */
const executor = async (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response,body) => {
            if(!error && response.statusCode === 200) {
                resolve(body);
            }
            else 
            {
                reject(response);
            }
        });
    });
};

exports.getExecution = getExecution;
