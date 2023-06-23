const create = require("../controllers/animals/create")
// const retrieve = require("../controllers/animals/retrieveByAnimal")
const retrieve = require("../controllers/animals/retrieve")
const update = require("../controllers/animals/update")
const delete_animal = require("../controllers/animals/delete_animal")
const retrieve_event_type = require ("../controllers/health_history/retrieve_event_type.js")

const express = require('express')

var router = express.Router();

router.post("/", create)
// router.get("/retrieveByanimal", retrieve)
router.get("/retrieve", retrieve)
router.put("/update", update)
router.delete("/delete_animal", delete_animal)
router.get("/retrieve_event_type", retrieve_event_type)

module.exports = router