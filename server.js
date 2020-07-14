// @ts-nocheck

// Importing Core Dependencies
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Importing Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Initializing Express Server
const app = express();
const PORT = 3001;

// Initializing Database
const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "karimkhattaby",
        password: "",
        database: "smart-brain"
    }
});

// Required Middlewares for API Functionality
app.use(cors());
app.use(express.json());

// GET root
app.get("/", (req, res) => res.send("Welcome to Smart Brain API."));
// POST SignIn
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// POST Register
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// GET Profile
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
// PUT Image
app.put("/image", (req, res) => { image.handleImage(req, res, db) });

// Starting Server to Listen to Requests
app.listen(PORT, () => {
    console.log("app is running on port " + PORT);
});