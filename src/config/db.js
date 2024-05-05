const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.MYSQL_RDS_USER,
  host: process.env.MYSQL_RDS_HOST,
  database: process.env.MYSQL_RDS_DATABASE,
  password: process.env.MYSQL_RDS_PASSWORD,
  port: 3306,
});

module.exports = pool;
