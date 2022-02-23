const nodemailer = require("nodemailer")

module.exports = {
	sendActivationEmail: async () => {
		let testAccount = await nodemailer.createTestAccount()
		console.log(testAccount)

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user, // generated ethereal user
				pass: testAccount.pass, // generated ethereal password
			},
		})

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Abel " <abel@example.com>', // sender address
			to: "jageticb@yahoo.com, jagetic.bojan@gmail.com", // list of receivers
			subject: "Hello ✔", // Subject line
			text: "Hello world?", // plain text body
			html: "<b>Hello world and welcome to the Abel !</b>", // html body
		})
		console.log("Message sent: %s", info.messageId)
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
		return true
	},
}
