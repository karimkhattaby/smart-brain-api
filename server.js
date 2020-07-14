// @ts-nocheck
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { hash } = require('bcrypt-nodejs');

const app = express();
const PORT = 3001;

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "karimkhattaby",
        password: "",
        database: "smart-brain"
    }
});

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: bcrypt.hashSync("cookies", null, null),
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: bcrypt.hashSync("bananas", null, null),
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: "987",
            hash: "",
            email: "john@gmail.com"
        }
    ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
    //TODO: This part only for testing, don't forget to change it.
    res.send(database.users);
});

app.post("/signin", (req, res) => {
    
    db.select("email", "hash").from("login")
    .where("email", '=', req.body.email)
    .then(data => {
        return bcrypt.compareSync(req.body.password, data[0].hash)
        ? db.select('*').from("users").where("email", '=', req.body.email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json("Unable to Get User"))
        : res.status(400).json("Wrong Credentials");
    })
    .catch(err => res.status(400).json("Wrong Credentials"));
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hashedPassword
        })
        .into("login")
        .returning("email")
        .then(loginEmail => trx.insert({
                name: name,
                email: email,
                joined: new Date()
            })
            .into("users")
            .returning('*')
            .then(user => res.json(user[0]))
        )
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json("Unable to Register"));
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select('*').from("users").where("id", '=', id)
    .then(user => user.length ? res.json(user[0]) : res.status(400).json("Not Found"))
    .catch(err => res.status(400).json("Error Getting User"));
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    db("users")
    .where("id", '=', id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(Number(entries[0])))
    .catch(err => res.status(400).json("Unable to Get Entries Count"));
});

app.listen(PORT, () => {
    console.log("app is running on port " + PORT);
});