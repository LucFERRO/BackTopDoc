import { DataTypes, Sequelize } from "sequelize"

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {

    const concatRequiredMessage = (data: string) => {
        return `${data} is required`
    }

    return sequelize.define('Doctor', {
        doctor_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        activity: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: concatRequiredMessage('Activity') },
                notEmpty: { msg: concatRequiredMessage('Activity') }
            }
        }
    },
    {
        underscored: true
    }
    )
}
