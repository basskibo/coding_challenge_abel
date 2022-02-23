const userSchema = require("./schema"),
	config = require("../../config/config"),
	helperMethod = require("../../utils/helperMethod")

const mongoose = require("mongoose"),
	validator = require("validator")
const User = mongoose.model("User", userSchema)

module.exports = {
	create: async (args) => {
		let { email, firstName, lastName, password, confirmPassword, role } = args
		console.log(
			"Starting user registration !",
			email,
			firstName,
			lastName,
			password,
			role
		)
		email = email.toLowerCase()
		if (!validator.isEmail(email)) {
			throw {
				msg: "Please enter valid email, e.g. test@mail.com",
				status: 400,
			}
		}
		if (!validator.isLength(password, { min: 8 })) {
			throw {
				msg: "Password must be at least 8 characters long",
				status: 400,
			}
		}
		if (args.password !== confirmPassword) {
			throw {
				msg: "Passwords does not match",
				status: 400,
			}
		}
		if (!validator.isIn(role, config.validation.enumRoles)) {
			throw {
				msg: "Role is not valid, please select a valid role",
				status: 404,
			}
		}
		try {
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
			const existingUser = await User.findOne({ email: email }).exec()
			if (existingUser) {
				throw {
					msg: `Account with email ${email} already exists`,
					status: 400,
				}
			}
			const createdUser = await user.save()
			console.log(createdUser)
			console.log(`User ${firstName} ${lastName} has been successfully created !`)
			return createdUser
		} catch (exception) {
			console.log(exception)
			throw exception
		}
	},
}
