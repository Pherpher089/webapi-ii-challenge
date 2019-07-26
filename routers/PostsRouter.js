const express = require('express');
const db = require('../data/db.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    db.find()
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({err: "The posts information could not be retrieved."})
    })
})

postRouter.get('/:id', (req, res) => {

    db.findById(req.params.id)
    .then(posts =>{
        if(posts === []) {
            res.status(404).jason({message: `The post with id: ${req.params.id} does not exist`})
        }
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({err: "The posts information could not be retrieved."})
    })
})

postRouter.post('/', async (req, res) => {
    const {title, contents} = req.body;
    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    try {
        const post = await db.insert(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({error: "There was an error while sving the post to the database"})
    }
})

postRouter.post('/:id/comments', async (req, res) => {
    if(!db.findById(req.params.id)) {
        res.status(404).json({message: `The post with the id ${req.params.id} does not exist`})
    }

    if(!req.body.text)
    {
        res.status(400).json({errorMessage: "Please provide text for the comment"})
    }
    try {
        const comment = await db.insertComment(req.body)
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    }
})

postRouter.get('/:id/comments', async (req, res) => {
    const id = req.params.id;
    if(!db.findById(id)){
        res.status(404).json({message: "The post with the specified ID does not exist"})
    }

    try{
        const comment = await db.findPostComments(req.params.id)
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({errorMessage: "The comments information could not be retrieved."})
    }
})

postRouter.delete('/:id', async (req, res) => {
    if(!db.findById(req.params.id)) {
        res.status(404).json({message: "The post with the specified ID does not exist"})
    }

    try {
        const deletedPost = await db.remove(req.params.id)
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(500).json({errorMessage: "There was an error while removing this post from the database."})        
    }
})

postRouter.put('/:id', async (req, res) => {
    if(!db.findById(req.params.id)) {
        res.status(404).json({message: "The post associated with that id does not exist."})
    }
    
    const {title, contents} = req.body

    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

    try {
        const editedPost = await db.update(req.params.id, req.body)
        res.status(200).json(editedPost);
    } catch (error) {
        res.status(500)
    }
})


module.exports = postRouter;