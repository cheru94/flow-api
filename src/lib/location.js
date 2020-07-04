const utils = require('./utils');

exports.handler = async () => {
    const publicIp = await utils.getIp();
    return await utils.ipApiData(publicIp);
};
