const express = require('express')
const postsRouter = require('./routers/PostsRouter.js')

const server = express();
server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/',(req, res) => {
    res.status(200).json('Hello from webapi-ii-challenge!')
})

server.listen(4000, () => console.log('magic happening on port 4000'))