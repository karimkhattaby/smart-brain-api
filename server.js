// @ts-nocheck
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const PORT = 3001;

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
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: hashedPassword,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if(!found) {
        res.status(400).json("user not found");
    }
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