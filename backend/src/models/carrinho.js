const db = require("../database/banco")

const Produtos = require("./produtos")
const Usuarios = require("./usuarios")

const Carrinho = db.sequelize.define('carrinho',{
    cartId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantidade : {
        type: db.Sequelize.INTEGER
    },
},
{
    tableName: 'carrinho',
});

Carrinho.belongsTo(Produtos, {foreignKey: 'produtoId'});
Carrinho.belongsTo(Usuarios, {foreignKey: 'usuarioId'});

module.exports = Carrinho