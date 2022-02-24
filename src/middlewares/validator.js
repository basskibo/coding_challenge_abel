const validator = require("validator")

const userSchema = require("../models/user/schema"),
	config = require("../config/config"),
	mongoose = require("mongoose"),
	User = mongoose.model("User", userSchema)

const standarExpressCallback = (request, response, next) => {
	console.log("I am middleware")
	next()
}
const registerValidation = async (request, response, next) => {
	let { email, firstName, lastName, password, confirmPassword, role } = request.body
	// TODO find better way to handle
	if (!email || !firstName || !lastName || !password || !confirmPassword || !role) {
		throw {
			msg: "All parameters are required and can not be empty",
			statusCode: 404,
		}
	}
	console.log("Starting user registration !", email, firstName, lastName, password, role)
	if (!validator.isEmail(email)) {
		console.log("NOT VALID MAIL")
		throw {
			msg: "Please enter valid email, e.g. test@mail.com",
			statusCode: 400,
		}
	}
	if (!validator.isLength(password, { min: 8 })) {
		throw {
			msg: "Password must be at least 8 characters long",
			statusCode: 400,
		}
	}
	if (!validator.equals(password, confirmPassword)) {
		throw {
			msg: "Passwords does not match",
			statusCode: 400,
		}
	}
	if (!validator.isIn(role, config.validation.enumRoles)) {
		throw {
			msg: "Role is not valid, please select a valid role",
			statusCode: 404,
		}
	}

	email = email.toLowerCase()

	email = validator.normalizeEmail(email, { gmail_remove_dots: false })

	const existingUser = await User.findOne({ email: email }).exec()

	if (existingUser) {
		next(response.status(400).send(`User with email ${email} already exists!`))
	}
	next()
}

module.exports = {
	standarExpressCallback,
	registerValidation,
}
