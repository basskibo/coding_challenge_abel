const { createClient } = require("redis"),
	helperMethod = require("../utils/helperMethod")
const client = createClient({
	url: process.env.REDIS_URL,
})

client.connect({ url: process.env.REDIS_URL })
module.exports = {
	storeSessionCredentials: async (data) => {
		try {
			const key = `abl-${data._id}-${helperMethod._generateRandom(10)}`
			await client.select(2)
			await client.HSET(
				key,
				"data",
				JSON.stringify({ hash: data.hash, role: data.role }, { EX: 100 })
			)
			return key
		} catch (e) {
			throw "There was error storing session credentials"
		}
	},
	checkSession: async (session) => {
		await client.select(2)
		const foundSession = await client.HGETALL(session)
		console.log(foundSession)
		if (foundSession === null) {
			return false
		}
		return foundSession
	},
}
