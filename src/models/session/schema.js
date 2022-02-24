const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Schema = mongoose.Schema
const config = require("../../config/config")

const sessionSchema = new Schema(
	{
		user: {
			type: String,
			required: true,
			default: "John",
		},
		coach: {
			type: String,
			required: true,
			default: "Doe",
		},
		sessionLength: {
			type: String,
			required: true,
			default: "Doe",
		},
		time: {
			type: String,
			unique: true,
			required: true,
			minlength: [config.validation.email.min, "Email must be at least 5 characters."],
			maxlength: [
				config.validation.email.max,
				"Email must be less than 35 characters.",
			],
		},
	},
	{ timestamps: true }
)

const Session = mongoose.model("Session", sessionSchema)

module.exports = sessionSchema
