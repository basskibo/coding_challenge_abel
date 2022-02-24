#!/usr/bin/env node

/**
 * Module dependencies.
 */
require("dotenv").config()
const PORT = process.env.PORT || 3000,
	MONGOOSE_URL = process.env.MONGOOSE_URL || "mongodb://localhost:27017/cc_abel"
const mongoose = require("mongoose")
var app = require("./app")
let chalk = require("chalk")

/**
 * Get port from environment and store in Express.
 */ console.log("------------------------------------")

connectToMongo().catch((err) => {
	console.log(err)
	console.log("Error while mongoose connection, exiting ..")
	process.exit(1)
})

async function connectToMongo() {
	const connected = await mongoose.connect(MONGOOSE_URL)
	console.log(`%s Mongoose connected to : ${MONGOOSE_URL}`, chalk.green("✔"))
}

app.listen(PORT, () => {
	console.log(`%s Server started and running on port: ${PORT}`, chalk.green("✔"))
})
