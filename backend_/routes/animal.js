const create = require("../controllers/animals/create")
const retrieve = require("../controllers/animals/retrieve")
const update = require("../controllers/animals/update")
const delete_animal = require("../controllers/animals/delete_animal")

const express = require('express')

var router = express.Router();

router.post("/", create)
router.get("/retrieve", retrieve)
router.put("/update", update)
router.delete("/delete_animal", delete_animal)

module.exports = router