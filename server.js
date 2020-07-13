// @ts-nocheck
const express = require('express');

const app = express();
const PORT = 3000;

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