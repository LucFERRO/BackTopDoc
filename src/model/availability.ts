import { DataTypes, Sequelize } from "sequelize"

export const AvailabilityModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Availability', {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        availability: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Availability') },
                notEmpty: { msg: concatRequiredMessage('Availability') }
            }
        }
    },
        {
            freezeTableName: true,
            tableName: "availabilities",
            underscored: true
        }
    )
}