const emailHandler = require("../utils/mailHandler"),
	userModel = require("../models/user/model")

/**
 * User module.
 * @module {{Dynamic}} api/interface/userService
 */

module.exports = {
	/**
	 * Method for user registration.
	 * @param {object} data - Information about user which is being registered
	 * @return {object} Created user's data.
	 */
	register: async (data) => {
		return await userModel.create(data)
	},

	/**
	 * Method for login.
	 * @param {string} color - The color, in hexadecimal format.
	 * @param {number} percent - The percentage, ranging from 0 to 100.
	 * @return {string} The darkened color.
	 */
	login: (x, y) => {
		console.log("THIS IS CONTROLLER TEST")
		return "test"
	},
}
