const redis = require('redis');
const { redisConfig } = require('../config');

const redisClient = redis.createClient(redisConfig);

redisClient.connect().catch(console.error);

module.exports = redisClient;
