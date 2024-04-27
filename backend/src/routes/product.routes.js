const express = require('express');
const productRouter = express.Router();
const Produtos = require('../models/produtos');

productRouter.get('/', (req, res) => {
    Produtos.findAll().then((produtos) => {
        res.json(produtos);
    });
});


module.exports = productRouter;