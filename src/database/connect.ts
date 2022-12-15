import { DataTypes } from "sequelize"

import { persons } from "../database/mocks/mock-person"

import { tokenTypes } from "../type/token"
import { tokens } from "../database/mocks/mock-token"
import { TokenModel } from "../model/token"

import { banTypes } from "../type/ban"
import { bans } from "../database/mocks/mock-ban"
import { BanModel } from "../model/ban"

import { addressTypes } from "../type/address"
import { addresses } from "../database/mocks/mock-address"
import { AddressModel } from "../model/address"

import { doctorTypes } from "../type/doctor"
import { doctors } from "../database/mocks/mock-doctor"
import { DoctorModel } from "../model/doctor"

import { patientTypes } from "../type/patient"
import { patients } from "../database/mocks/mock-patient"
import { PatientModel } from "../model/patient"

import { backgroundTypes } from "../type/background"
import { backgrounds } from "../database/mocks/mock-background"
import { BackgroundModel } from "../model/background"

import { planningTypes } from "../type/planning"
import { plannings } from "../database/mocks/mock-planning"
import { PlanningModel } from "../model/planning"

import { vacationTypes } from "../type/vacation"
import { vacations } from "../database/mocks/mock-vacation"
import { VacationModel } from "../model/vacation"

import { appointementTypes } from "../type/appointement"
import { appointements } from "../database/mocks/mock-appointement"
import { AppointementModel } from "../model/appointement"

import { workdayTypes } from "../type/workday"
import { workdays } from "../database/mocks/mock-workday"
import { WorkdayModel } from "../model/workday"

import { sequelize } from './sequelize'
import { pathToFileURL } from "url"


import { Person } from "../model/person.model"

sequelize.authenticate()
    .then(() => console.log('Successfully connected to database.'))
    .catch((error: Error) => console.error(`Could not connect to database: ${error}`)
    )

export const Token = TokenModel(sequelize, DataTypes)
export const Ban = BanModel(sequelize, DataTypes)
export const Address = AddressModel(sequelize, DataTypes)
export const Doctor = DoctorModel(sequelize, DataTypes)
export const Patient = PatientModel(sequelize, DataTypes)
export const Background = BackgroundModel(sequelize, DataTypes)
export const Appointement = AppointementModel(sequelize, DataTypes)
export const Vacation = VacationModel(sequelize, DataTypes)
export const Planning = PlanningModel(sequelize, DataTypes)
export const Workday = WorkdayModel(sequelize, DataTypes)

Person.hasOne(Doctor, { foreignKey: 'doctor_id' })
Doctor.belongsTo(Person, { foreignKey: 'doctor_id' })

Person.hasOne(Patient, { foreignKey: 'person_id' })
Patient.belongsTo(Person, { foreignKey: 'person_id' })

Doctor.hasMany(Appointement, { foreignKey: 'doctor_id' })
Appointement.belongsTo(Doctor, { foreignKey: 'doctor_id' })

Patient.hasMany(Appointement, { foreignKey: 'patient_id' })
Appointement.belongsTo(Patient, { foreignKey: 'patient_id' })

export const initDb = () => {

    return sequelize.sync({ force: true }).then(() => {

        persons.map((person) => {
            Person.create({
                person_id: person.person_id,
                lastname: person.lastname,
                firstname: person.firstname,
                mail: person.mail,
                password: person.password,
                birthdate: person.birthdate,
                phone_number: person.phone_number,
                description: person.description,
                avatar: person.avatar
            }).then((response: { toJSON: () => string }) => {
                console.log(response.toJSON())

                // TODO : 
                patients.map((patient: patientTypes) => {
                    if (patient.person_id == person.person_id) {
                        Patient.create({
                            person_id: patient.person_id,
                        }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
                    }
                })
                doctors.map((doctor: doctorTypes) => {
                    if (doctor.doctor_id == person.person_id) {
                        Doctor.create({
                            doctor_id: doctor.doctor_id,
                            activity: doctor.activity,
                        }).then((response: { toJSON: () => string }) => {
                            console.log(response.toJSON())

                            // TODO :
                            appointements.map((appointement: appointementTypes) => {
                                Appointement.create({
                                    appointement_date: appointement.appointement_date,
                                    appointement_duration_minutes: appointement.appointement_duration_minutes,
                                    appointement_reason: appointement.appointement_reason,
                                    doctor_id: appointement.doctor_id,
                                    patient_id: appointement.patient_id,
                                }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
                            })
                        })
                    }
                })
            })
        })

        // patients.map((patient: patientTypes) => {
        //     Patient.create({
        //         person_id: patient.person_id,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })

        // doctors.map((doctor: doctorTypes) => {
        //     Doctor.create({
        //         person_id: doctor.person_id,
        //         activity: doctor.activity,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })

        // tokens.map((token: tokenTypes) => {
        //     Token.create({
        //         token_id: token.token_id,
        //         token: token.token
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // bans.map((ban: banTypes) => {
        //     Ban.create({
        //         ban_id: ban.ban_id,
        //         ban_date: ban.ban_date,
        //         ban_reason: ban.ban_reason
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // addresses.map((address: addressTypes) => {
        //     Address.create({
        //         address_id: address.address_id,
        //         address_number: address.address_number,
        //         street_name: address.street_name,
        //         zip_code: address.zip_code
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })

        // backgrounds.map((background: backgroundTypes) => {
        //     Background.create({
        //         background_id: background.background_id,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // plannings.map((planning: planningTypes) => {
        //     Planning.create({
        //         planning_id: planning.planning_id,
        //         planning_name: planning.planning_name,
        //         planning_start: planning.planning_start,
        //         planning_end: planning.planning_end,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // vacations.map((vacation: vacationTypes) => {
        //     Vacation.create({
        //         vacation_id: vacation.vacation_id,
        //         vacation_start: vacation.vacation_start,
        //         vacation_end: vacation.vacation_end,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // appointements.map((appointement: appointementTypes) => {
        //     Appointement.create({
        //         appointement_date: appointement.appointement_date,
        //         appointement_duration_minutes: appointement.appointement_duration_minutes,
        //         appointement_reason: appointement.appointement_reason,
        //         doctor_id: appointement.doctor_id,
        //         patient_id: appointement.patient_id,
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        // workdays.map((workday: workdayTypes) => {
        //     Workday.create({
        //         workday_id: workday.workday_id,
        //         workday_number: workday.workday_number,
        //         workday_start: workday.workday_start,
        //         workday_end: workday.workday_end,
        //         slot_duration_minutes: workday.slot_duration_minutes
        //     }).then((response: { toJSON: () => string }) => console.log(response.toJSON()))
        // })
        console.log('Database successfully initialized.')
    })
}