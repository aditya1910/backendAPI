// All mongo schema is exported from here
const mongoose = require('mongoose');

const userDetailsSchema = require('./User');
const monitorSchema = require('./Monitor');
const responseTimeSchema = require('./responseTime');

module.exports = {
	User: mongoose.model('User', userDetailsSchema),
	Monitor: mongoose.model('Monitor', monitorSchema),
	ResponseTime: mongoose.model('ResponseTime', responseTimeSchema),
};
