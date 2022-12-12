import { DataTypes, Sequelize } from "sequelize"

export const BackgroundModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Background', {
        background_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
        {
            freezeTableName: true,
            tableName: "backgrounds",
            underscored: true
        }
    )
}