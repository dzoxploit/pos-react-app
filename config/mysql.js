const express = require('express');
const mysql = require('mysql');
const app = express();

mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'homestade'
});
