var express = require('express');
var router = express.Router();
const { Pool } = require('pg');


const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', async function(req, res, next){
  /*pool.connect();
  var client = await pool.connect();
  console.log(client);*/
  pool.query('SELECT * FROM users', (err, res) =>{
    console.log(err, res)
    pool.end()
  })
})

module.exports = router;
