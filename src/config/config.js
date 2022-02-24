module.exports = {
	automaticActivation: true,
	validation: {
		enumRoles: ["coach", "client", "admin"],
		email: {
			min: 5,
			max: 35,
		},
		password: {
			min: 6,
			max: 30,
		},
		activationTokenLength: 30,
	},
}
