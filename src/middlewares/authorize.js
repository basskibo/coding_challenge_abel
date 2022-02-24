// Define it
const redisHandler = require("../utils/redisHandler")
module.exports = async function isLoggedIn(req, res, next) {
	// console.log("CHECKING RESTRICTED ROUTE!!", req.session.passport);
	try {
		const sessionId = req.headers.session
		if (!sessionId) {
			throw { msg: "Session missing from headers" }
		}
		const sessionFound = await redisHandler.checkSession(req.headers.session)
		if (!sessionFound) {
			next(res.status(404).send(`You are not authorized for this action`))
		}
		console.log("session : ", JSON.stringify(sessionFound))

		next()
	} catch (e) {
		throw e
	}
}
