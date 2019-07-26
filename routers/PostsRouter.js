const express = require('express');
const db = require('../data/db.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    db.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = postRouter;