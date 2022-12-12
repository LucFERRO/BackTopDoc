
import { DataTypes, Sequelize } from "sequelize"


export const TokenModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required.`
    }

    return sequelize.define('Token', {
        token_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Token') },
                notEmpty: { msg: concatRequiredMessage('Token') }
            }
        },
    },
        {
            freezeTableName: true,
            tableName: "tokens",
            underscored: true
        }
    )
}