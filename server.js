require("dotenv").config()
const PORT = process.env.PORT || 3000,
	MONGOOSE_URL = process.env.MONGOOSE_URL || "mongodb://localhost:27017/cc_abel"
const express = require("express")
const chalk = require("chalk")
const coachRouter = require("./src/routes/coach")
const clientRouter = require("./src/routes/client")
const authRouter = require("./src/routes/auth")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const router = express.Router()
connectToMongo().catch((err) => {
	console.log(err)
	console.log("Error while mongoose connection, exiting ..")
	process.exit(1)
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api/coach", coachRouter)
app.use("/api/client", clientRouter)
app.use("/api/auth", authRouter)

router.post("/ping", function (req, res) {
	console.log(req.body)
	res.send("Client router Ping")
})

console.log("------------------------------------")

var os = require("os")

var ifaces = os.networkInterfaces()

let ip
Object.keys(ifaces).forEach((ifname) => {
	var alias = 0

	ifaces[ifname].forEach((iface) => {
		if (iface.family !== "IPv4" || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			return
		}

		if (alias >= 1) {
			// this single interface has multiple ipv4 addresses
			// console.log(ifname + ':' + alias, iface.address);
			ip = iface.address
		} else {
			// this interface has only one ipv4 adress
			// console.log(ifname, iface.address);
			ip = iface.address
		}
		++alias
		console.log(`%s Started on IP address: ${ip}`, chalk.green("✔"))
	})
})

async function connectToMongo() {
	const connected = await mongoose.connect(MONGOOSE_URL)
	console.log(`%s Mongoose connected to : ${MONGOOSE_URL}`, chalk.green("✔"))
}

app.listen(PORT, () => {
	console.log(`%s Server started and running on port: ${PORT}`, chalk.green("✔"))
})
