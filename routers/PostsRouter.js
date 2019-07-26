const express = require('express');

const postRouter = express.Router();


postRouter.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from /api/posts!'})
})


module.exports = postRouter;