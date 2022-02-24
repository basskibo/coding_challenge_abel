const { createClient } = require("redis"),
	helperMethod = require("../utils/helperMethod")
const client = createClient({
	url: process.env.REDIS_URL,
})

client.connect({ url: process.env.REDIS_URL })
module.exports = {
	storeSessionCredentials: async (data) => {
		const key = `abl-${data._id}-${helperMethod._generateRandom(10)}`
		await client.select(2)
		await client.HSET(key, "data", JSON.stringify({ hash: data.hash }, { EX: 100 }))
		// const value = await client.hGet(`kibo-${new Date().getTime}`)
		// console.log(client)
		return key
		// console.log(value)
	},
	checkSession: async (session) => {
		// client.select(sessionStorage, function () {
		console.log("Searching for client ", session)
		await client.select(2)

		const foundSession = await client.HGETALL(session)
		console.log(foundSession)
		if (foundSession === null) {
			return false
		}
		// console.log('session checked: ' + session);
		return foundSession

		// })
	},
}
