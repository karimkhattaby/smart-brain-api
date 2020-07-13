// @ts-nocheck
const express = require('express');

const app = express();
const PORT = 3000;

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        },
    ]
};

app.get("/", (req, res)=> {
    res.send("this is working");
});

app.use(express.json());
app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json("success");
    } else {
        res.status(400).json("error logging in");
    }
    res.json("signin");
});

app.listen(PORT, () => {
    console.log("app is running on port " + PORT);
});

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/