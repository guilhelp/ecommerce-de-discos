const db = require("../database/banco")

const Produtos = db.sequelize.define('produtos',{
    productId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.STRING
    },
    preco:{
        type: db.Sequelize.DOUBLE
    },
    imagem:{
        type: db.Sequelize.STRING
    }
})

module.exports = Produtos