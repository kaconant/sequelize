// in terminal
// npm init
// npm install express nodemon pg sequelize

const express = require('express');
const Sequelize = require('sequelize');
// const dotenv = require('dotenv'); -- use this is if you want to use a password in sequelize
// dotenv.load();
// create a file called .env (environment variable) -- set postgress pass, user, host, dbname

const bodyParser = require('body-parser');
const app = express();
const sequelize = new Sequelize('postgres://postgres@localhost:5432/blog')
//'postgress://user:pass@localhost:5432/dbname'
// go into terminal and do psql , CREATE DATABASE dbname;

app.use(bodyParser({urlencoded:true}));

sequelize.authenticate()
    .then(() => {
        console.log('successfully connected');
    })
    .catch(err => {
        console.log('unable to connect: ' + err);
    })

const User = sequelize.define('user', {
    username: Sequelize.STRING, // string will turn into varchar in database
    password: Sequelize.STRING,
});

/* 
User.sync().then(() => {
    User.create({
        username: 'jimmy',
        password: 'bananapancake',
    });
})
*/

app.get('/', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    })
})

app.get('/getthree', (req, res) => {
    User.findAndCount({
        limit: 3
    }).then(users => {
        res.json(users.rows);
    })
})

app.post('/create', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    });
    res.send('user created');
});

// to add in postman, 
// go to POST
// click w-xxx-form
// put in key + values and hit send


app.listen(3000,() => {
    console.log('listening on port 3000')
})