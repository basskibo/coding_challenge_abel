const express = require("express")
const chalk = require("chalk")
const coachRouter = require("./src/routes/coach")
const clientRouter = require("./src/routes/client")
const authRouter = require("./src/routes/auth")
const app = express()
const bodyParser = require("body-parser")
const UserController = require("./src/controllers/auth")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/api/coach", coachRouter)
app.use("/api/client", clientRouter)
app.use("/api/auth", authRouter)

module.exports = app
