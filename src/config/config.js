module.exports = {
	automaticActivation: true,
	validation: {
		enumRoles: ["coach", "client", "admin"],
		email: {
			min: 5,
			max: 35,
		},
		activationTokenLength: 30,
	},
}
