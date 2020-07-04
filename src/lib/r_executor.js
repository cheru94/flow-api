const request = require('request');


const getExecution = async (options) => {
    try {
        return await executor(options);
    } catch (error) {
        return error;        
    }
};


const executor = (options) => {
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
