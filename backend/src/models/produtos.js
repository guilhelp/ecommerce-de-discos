const db = require("../database/banco")

const Produtos = db.sequelize.define('produtos',{
    nome:{
        type: db.Sequelize.STRING
    },
    descricao:{
        type: db.Sequelize.STRING
    },
    preco:{
        type: db.Sequelize.STRING
    },
    imagem:{
        type: db.Sequelize.STRING
    }
})

module.exports = Produtos