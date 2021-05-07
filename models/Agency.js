module.exports = (sequelize, Sequelize) =>{
    const Agency = sequelize.define("Agency", {
        number: Sequelize.INTEGER,
        description: Sequelize.STRING
    })

    Agency.associate = (models) =>{
        Agency.belongsTo(models.Bank, {
            foreingKey: 'idBank',
            as: "bank"
        })
    }
    return Agency;
}