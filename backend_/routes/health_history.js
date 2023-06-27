const create = require("../controllers/health_history/create")
const retrieve = require("../controllers/health_history/retrieve")
const retrieve_by_animal = require("../controllers/health_history/retrieve_by_animal")
// const retrieve_event_type = require("../controllers/health_history/retrieve_event_type")
const update = require("../controllers/health_history/update")
const delete_historic = require("../controllers/health_history/delete_historic")
const express = require('express')

var router = express.Router();

router.post("/", create)
router.get('/retrieve/:id', retrieve); //id do animal
router.put('/update/:id', update);
router.delete('/delete_historic/:id', delete_historic); 
router.get("/getAnimal/:animal_id", retrieve_by_animal)

module.exports = router