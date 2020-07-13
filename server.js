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