const bodyParser = require('body-parser')
const users = require('./user')
const animals = require('./animal')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

module.exports = (app) => {
	app.use('/users', jsonParser, urlencodedParser, users)
	app.use('/animals', jsonParser, urlencodedParser, animals)
}