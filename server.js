const express = require('express');
const authRouter = require('./api/auth/authRouter');
// const userRouter = require('./api/user/userRouter');
// const itemRouter = require('./api/item/itemRouter');

const server = express();
server.use(express.json());
server.use('/auth', authRouter)
// server.use('/api/user', userRouter);
// server.use('/api/item', itemRouter);

module.exports = server;