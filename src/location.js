const utils = require('./lib/utils');

exports.handler = async () => {
    const publicIp = await utils.getIp();
    return await utils.ipApiData(publicIp);
};
