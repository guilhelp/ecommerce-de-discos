const express = require('express');
const userRouter = express.Router();
const withAuth = require('../middleware/withAuth');

userRouter.put('/', withAuth, (req, res) => {
    res.json({ message: 'Hello World!' });
});

userRouter.delete('/', withAuth, (req, res) => {

});

module.exports = userRouter;