const mysql = require('mysql2/promise')
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
})

// test connectin
pool.getConnection()
    .then((conn) => {
        console.log(`Connection to MySQL successfully`);
        conn.release();
    })
    .catch((err) => {
        console.error("Connection failed", err.message);
    })

module.exports = pool;