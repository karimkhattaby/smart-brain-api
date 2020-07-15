// @ts-nocheck

// Importing API Call Dependency
const Clarifai = require('clarifai');

// Importing API Key
const apiKey = require('../private/apiKey');

// You must add your own API key from Clarifai
const app = new Clarifai.App({apiKey: apiKey});

const handleAPICall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("API Error"));
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
    .where("id", '=', id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(Number(entries[0])))
    .catch(err => res.status(400).json("Unable to Get Entries Count"));
};

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
};