const create = require("../controllers/health_history/create")
const retrieve_by_animal = require("../controllers/health_history/retrieve_by_animal")
const retrieve_event_type = require("../controllers/health_history/retrieve_event_type")
const express = require('express')

var router = express.Router();

router.post("/", create)
router.get("/getAnimal/:animal_id", retrieve_by_animal)

module.exports = router