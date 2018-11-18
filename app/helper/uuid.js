/*
	file having functions to create different types of random strings and random numbers
 */
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');

module.exports = {
	/**
	 * generates a random string on the basis of current timestamps by default
	 * @return {String} 16 digit hex string
	 */
	genuuid() {
		const id = uuidv1();
		return id;
	},
};
