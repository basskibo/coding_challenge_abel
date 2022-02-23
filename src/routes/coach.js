const { route } = require("./client")

const express = require("express"),
	router = express.Router(),
	coachService = require("../controllers/auth")

router.get("/", async (req, res) => {
	// const rsp = await coachService.register(req.body)
	res.send("rsp")
})

// router.post("/", async (req, res) => {
// 	try {
// 		const rsp = await coachService.register(req.body)
// 		res.send(rsp)
// 	} catch (exc) {
// 		// console.log("EXC!!!!")
// 		// console.error(exc)
// 		res.writeHead(exc.status || 500)
// 		res.end(exc.msg || "There was some internal error trying to register the coach")
// 	}
// })
module.exports = router
