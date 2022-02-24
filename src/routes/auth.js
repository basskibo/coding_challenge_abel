const express = require("express"),
	router = express.Router(),
	app = express(),
	UserController = require("../controllers/auth"),
	User = require("../models/user/schema")
const { body, validationResult, check } = require("express-validator")
const config = require("../config/config")

const crypto = require("crypto")
var parser = require("body-parser")
var urlencodedParser = parser.urlencoded({ extended: false })
const authMiddleware = require("../middlewares/authorize")

/** API for registration of user */
router.post(
	"/",
	[
		check("email")
			.notEmpty()
			.isEmail()
			.normalizeEmail()
			.custom(async (value) => {
				const user = await UserController.findUserByEmail(value)
				if (user) {
					throw `E-mail ${value} is already in use, please choose a different email`
				}
			}),
		check("firstName").notEmpty(),
		check("lastName").notEmpty(),
		check("role").notEmpty().isIn(config.validation.enumRoles),
		check("password").exists(),
		check(
			"confirmPassword",
			"confirmPassword field must have the same value as the password field"
		)
			.exists()
			.custom((value, { req }) => value === req.body.password),
	],

	async (req, res) => {
		try {
			validationResult(req).throw()
			const rsp = await UserController.register(req.body)
			res.send(rsp)
		} catch (exc) {
			res.writeHead(exc.statusCode || 500)
			res.end(
				exc.msg ||
					`${exc.errors[0].msg} for ${exc.errors[0].param}` ||
					"There was some internal error trying to register the user"
			)
		}
	}
)

/** API for user authentication  */
router.post(
	"/login",
	[
		check("email").notEmpty().isEmail(),
		check("password")
			.exists()
			.custom(async (value) => {
				if (value.length < config.validation.password.min) {
					throw `Minimum characters length is ${config.validation.password.min} `
				}
			}),
	],
	async (req, res) => {
		try {
			validationResult(req).throw()
			console.log("VEC POSTOJI??")

			const user = await UserController.login(req.body)
			this._express = {
				session: user.session,
				user: user,
				userId: user._id,
			}
			res.send(user)
		} catch (exc) {
			console.log(exc)
			res.writeHead(exc.statusCode || 500)
			res.end(
				exc.msg ||
					`${exc.errors[0].msg} for ${exc.errors[0].param}` ||
					"There was some internal error trying to register the user"
			)
		}
	}
)

router.get("/", authMiddleware, (req, res) => {
	try {
		// console.log(this._express)
		res.send("PING")
	} catch (exc) {
		console.log(exc)
		res.writeHead(exc.statusCode || 500)
		res.end(
			exc.msg ||
				`${exc.errors[0].msg} for ${exc.errors[0].param}` ||
				"There was some internal error trying to register the user"
		)
	}
})

module.exports = router
