
import { DataTypes, Sequelize } from "sequelize"

export const BanModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required.`
    }

    return sequelize.define('Ban', {

        ban_id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ban_date: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Ban date') },
                notEmpty: { msg: concatRequiredMessage('Ban date') }
            }
        },
        ban_reason: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Ban reason') },
                notEmpty: { msg: concatRequiredMessage('Ban reason') }
            }
        }
    },
        {
            freezeTableName: true,
            tableName: "bans",
            underscored: true
        }
    )
}