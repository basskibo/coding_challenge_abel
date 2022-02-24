const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const config = require("../../config/config")

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			default: "John",
		},
		lastName: {
			type: String,
			required: true,
			default: "Doe",
		},
		email: {
			type: String,
			unique: true,
			required: true,
			minlength: [config.validation.email.min, "Email must be at least 5 characters."],
			maxlength: [
				config.validation.email.max,
				"Email must be less than 35 characters.",
			],
		},
		password: {
			type: String,
			required: true,
			min: config.validation.password.min,
			max: config.validation.password.max,
			unique: true,
		},
		role: {
			type: "String",
			required: true,
			enum: config.validation.enumRoles,
		},
		activationToken: {
			type: String,
			min: config.validation.activationTokenLength,
			max: config.validation.activationTokenLength,
		},
		isActivated: {
			type: Boolean,
			default: false,
		},
		// passwordResetToken: String,
		// passwordResetExpires: Date,
		// emailVerificationToken: String,
		// emailAndAccountVerified: {
		//   type: Boolean,
		//   default: false
		// },
	},
	{ timestamps: true }
)

/**
 * Password hash middleware called before saving user
 */
userSchema.pre("save", function save(next) {
	const user = this
	const saltRounds = 10
	// if (!user.isModified("password")) {
	// 	return next()
	// }
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	return bcrypt.compareSync(candidatePassword, this.password)
}

const Coach = mongoose.model("Coach", userSchema)

module.exports = userSchema
