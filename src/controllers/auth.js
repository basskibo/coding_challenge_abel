const emailHandler = require("../utils/mailHandler"),
	redisHandler = require("../utils/redisHandler"),
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
	login: async (data) => {
		const { email, password } = data
		let user = await userModel.loginUser(email, password)
		console.log("user found ")
		console.log(user)
		const sessionKey = await redisHandler.storeSessionCredentials(user)
		user = { ...user, session: sessionKey }
		return user
	},
	findUserByEmail: async (email) => {
		return await userModel.findUserByEmail(email)
	},
}
