const db = require("../database/banco")

const Produtos = require("./produtos")
const Usuarios = require("./usuarios")

const Carrinho = db.sequelize.define('carrinho',{
    produtoId : {
        type: db.Sequelize.INTEGER,
        references: {
            model: Produtos,
            key: 'id'
        }
    },
    usuarioId:{
        type: db.Sequelize.INTEGER,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    quantidade : {
        type: db.Sequelize.INTEGER
    },
},
{
    tableName: 'carrinho',
});

Usuarios.belongsToMany(Produtos, {through: 'carrinho'});
Produtos.belongsToMany(Usuarios, {through: 'carrinho'});

module.exports = Carrinho