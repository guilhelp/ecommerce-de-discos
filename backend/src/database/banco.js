const Sequelize = require("sequelize")
const sequelize = new Sequelize("ecommerce", "root", "", {
    host: "localhost",
    dialect: "mysql"
})
sequelize.sync().then(() => console.log("Banco de dados sincronizado com sucesso!"));


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}