const login = require("../controllers/users/login")
const create = require("../controllers/users/create")
const retrieve = require("../controllers/users/retrieve")
const update = require("../controllers/users/update")
const delete_user = require("../controllers/users/delete_user")

const express = require('express')

var router = express.Router();

router.post("/", create)
router.get("/retrieve", retrieve)
router.put("/update", update)
router.delete("/delete_user", delete_user)
router.post("/login", login)

module.exports = router