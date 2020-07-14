// @ts-nocheck
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

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
    //TODO: This is only for testing, don't forget to remove it.
    res.send(database.users);
});

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email &&
        bcrypt.compareSync(req.body.password, database.users[0].password)) {
            res.json(database.users[0]);
    } else {
        res.status(400).json("error logging in");
    }
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    db("users")
    .returning('*')
    .insert({
        name: name,
        email: email,
        joined: new Date()
    })
    .then(user => res.json(user[0]))
    .catch(err => res.status(400).json("Unable to Register"));
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    db.select('*').from("users").where({id})
    .then(user => user.length ? res.json(user[0]) : res.status(400).json("Not Found"))
    .catch(err => res.status(400).json("Error Getting User"));
});

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if(!found) {
        res.status(400).json("user not found");
    }
});

app.listen(PORT, () => {
    console.log("app is running on port " + PORT);
});