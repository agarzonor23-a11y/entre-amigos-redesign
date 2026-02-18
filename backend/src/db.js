const { Pool } = require('pg');
require('dotenv').config();

// Use in-memory database if USE_MEMORY_DB is set to true
const USE_MEMORY_DB = process.env.USE_MEMORY_DB === 'true';

if (USE_MEMORY_DB) {
    console.log('⚠️  Using IN-MEMORY database (for development only)');
    module.exports = require('./db-memory');
} else {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    module.exports = {
        query: (text, params) => pool.query(text, params),
    };
}
