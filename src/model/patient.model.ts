import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Patient extends Model {
    patient_id!: number
    secu_number!: string
}

Patient.init({
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    secu_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Secu number') },
            notEmpty: { msg: concatRequiredMessage('Secu number') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "patients",
        underscored: true
    }
);