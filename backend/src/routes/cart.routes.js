const express = require('express');
const cartRouter = express.Router();
const withAuth = require('../middleware/withAuth');

cartRouter.post('/', withAuth, (req, res) => {
   
});

cartRouter.delete('/', withAuth, (req, res) => {
   
});

cartRouter.get('/', withAuth, (req, res) => {

});

module.exports = cartRouter;