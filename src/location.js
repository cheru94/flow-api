const utils = require('./lib/utils');

/**
 * @returns Returns the location information from ip-api
 */
exports.handler = async () => {
    const publicIp = await utils.getIp();
    return await utils.ipApiData(publicIp);
};
