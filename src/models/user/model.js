const userSchema = require("./schema"),
	config = require("../../config/config"),
	bcrypt = require("bcrypt"),
	helperMethod = require("../../utils/helperMethod")

const mongoose = require("mongoose"),
	validator = require("validator")
const User = mongoose.model("User", userSchema)
const isEmpty = (value) => {
	value === undefined ||
		value === null ||
		(typeof value === "Object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
}
const userModel = (module.exports = {
	create: async (args) => {
		console.log("Register controller started!")
		try {
			let { email, firstName, lastName, password, confirmPassword, role } = args
			email = email.toLowerCase()
			email = validator.normalizeEmail(email, { gmail_remove_dots: false })

			const user = new User({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				role: role,
				isActivated: config.automaticActivation ? config.automaticActivation : false,
				activationToken: helperMethod._generateRandom(30),
			})
			const createdUser = await user.save()
			console.log(`User ${firstName} ${lastName} has been successfully created !`)
			return createdUser
		} catch (exception) {
			console.log(exception)
			throw exception
		}
	},
	/**
	 * Login user.
	 */
	loginUser: async (email, password) => {
		email = email.toLowerCase()
		let user = await userModel.findUserByEmail(email)
		if (!user) {
			throw {
				statusCode: 404,
				msg: `User with email ${email} does not exist in database`,
			}
		} else if (!user.isActivated) {
			throw {
				statusCode: 400,
				msg: `Your account is not activated. Please confirm your email`,
			}
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		console.log("RESULT : ", passwordMatch)
		if (!passwordMatch) {
			throw {
				statusCode: 404,
				msg: `Wrong password entered for user ${user.email}`,
			}
		}
		const hash = await bcrypt.genSalt(15)
		let userClone = { ...user }
		const userWithHash = { ...user.toObject(), hash: hash } // mongoose results needs to be parsed to object
		console.log(userWithHash)

		return userWithHash
	},
	findUserByEmail: async (email) => {
		const user = await User.findOne({ email: email }).exec()
		return user
	},
})
