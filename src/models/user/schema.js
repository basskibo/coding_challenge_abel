const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const config = require("../../config/config")

const coachSchema = new Schema(
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
coachSchema.pre("save", function save(next) {
	const user = this
	console.log("DESILO SE PRE SAVE >>>")
	if (!user.isModified("password")) {
		return next()
	}
	console.log("PASSWORD TREBA DA SE UPDATE")
	bcrypt.genSalt(10, (err, salt) => {
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
coachSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	return bcrypt.compareSync(candidatePassword, this.password)
}

const Coach = mongoose.model("Coach", coachSchema)

module.exports = coachSchema
