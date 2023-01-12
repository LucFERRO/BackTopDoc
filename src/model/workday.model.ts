import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import { concatRequiredMessage } from "../core/methods"

export class Workday extends Model {
    workday_id!: number
    workday_number!: number
    workday_start!: string
    workday_end!: string
    slot_duration_minutes!: number
    lunch_break_start!: string
    lunch_break_end!: string
}

Workday.init({
    workday_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    workday_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day') },
            notEmpty: { msg: concatRequiredMessage('Day') }
        }
    },
    workday_start: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day start') },
            notEmpty: { msg: concatRequiredMessage('Day start') }
        }
    },
    workday_end: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Day end') },
            notEmpty: { msg: concatRequiredMessage('Day end') }
        }
    },
    slot_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Slot duration') },
            notEmpty: { msg: concatRequiredMessage('Slot duration') }
        }
    },
    lunch_break_start: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Lunch break start') },
            notEmpty: { msg: concatRequiredMessage('Lunch break start') }
        }
    },
    lunch_break_end: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notNull: { msg: concatRequiredMessage('Lunch break end') },
            notEmpty: { msg: concatRequiredMessage('Lunch break end') }
        }
    },
},
    {
        sequelize,
        freezeTableName: true,
        tableName: "workdays",
        underscored: true
    }
);