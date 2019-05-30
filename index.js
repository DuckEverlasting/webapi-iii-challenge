require('dotenv').config();

const server = require('./server.js');

const userRouter = require('./users/userRouter.js');

const postRouter = require('./posts/postRouter.js');

const port = process.env.PORT || 5000;

server.use('/posts', postRouter)

server.use('/users', userRouter)

server.listen(port, () => console.log(`\nlistening on ${port}\n`))