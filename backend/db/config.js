const { Pool } = require('pg');

module.exports = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'pethealthy',
    schema: 'public',
    password: '123',
    port: 5432
});