const db = require("../database/banco")

const Usuarios = db.sequelize.define('usuarios',{
    usuarioId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
        type: db.Sequelize.INTEGER
    },
    numero: {
        type: db.Sequelize.INTEGER
    },
    complemento: {
        type: db.Sequelize.STRING
    },
});

module.exports = Usuarios