// code away!
// const express = require('express');

const server = require('./server.js')

const userRouter = require('./users/userRouter.js');

const postRouter = require('./posts/postRouter.js');

server.use('/posts', postRouter)

server.use('/users', userRouter)

server.listen(5000, () => console.log("\nlistening on 5000\n"))