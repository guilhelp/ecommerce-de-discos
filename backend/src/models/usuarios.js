const db = require("../database/banco")

const Usuarios = db.sequelize.define('usuarios',{
    nome:{
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    senha:{
        type: db.Sequelize.STRING
    },
    data_nascimento:{
        type: db.Sequelize.DATEONLY
    },
    cep: {
        type: db.Sequelize.STRING
    },
    numero: {
        type: db.Sequelize.STRING
    },
    complemento: {
        type: db.Sequelize.STRING
    },
});

module.exports = Usuarios