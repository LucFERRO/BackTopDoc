import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Token extends Model {
    token_id!: number
    token!: string
    person_id!: number
}

Token.init({
    token_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Token') },
            notEmpty: { msg: concatRequiredMessage('Token') }
        }
    },
    person_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('person_id') },
            notEmpty: { msg: concatRequiredMessage('person_id') }
        }
    }
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "tokens",
        underscored: true
    }
);