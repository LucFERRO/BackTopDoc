import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    // const concatRequiredMessage = (data: string) => {
    //     return `${data} is required`
    // }

    return sequelize.define('Patient', {
        person_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        }
    },
    )
}
