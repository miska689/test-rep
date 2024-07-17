import sequelize from './db/dbConf.js'

export const sequelizeClient = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Sequelize Connected')

        return sequelize
    } catch (e) {
        console.log("Unable to connect to database.", e);
        process.exit(1);
    }
}