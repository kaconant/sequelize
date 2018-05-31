// npm init
// npm install express nodemon pg sequelize

const express = require('express');
const Sequelize = require('');
// const dotenv = require('dotenv'); -- use this is if you want to use a password in sequelize
// dotenv.load();
// create a file called .env (environment variable) -- set username and password

const app = express();
const sequelize = new Sequelize('postgres://postgres@localhost:5432/blog')
//'postgress://user:pass@localhost:5432/dbname'
// go into terminal and do psql , CREATE DATABASE dbname;

app.get('/', (req, res) => {
    res.json({'text': 'hello world'});
});

app.listen(3000,() => {
    console.log('listening on port 3000')
});