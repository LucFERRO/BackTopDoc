import { DataTypes, Model } from "sequelize";
import sequelize from "../../../sequelize";

export class Person extends Model {
  person_id?: number
  personne_nom: string
  personne_prenom: string
}
export class Nom extends Model { }

Person.init({
  personnne_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  personne_nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  personne_prenom: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'personne',
  timestamps: false,
  freezeTableName: true
});



