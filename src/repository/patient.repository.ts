import { IRepository, IRepositoryInheritance } from "../core/respository.interface";
import { PatientDTO, PatientDTOFull } from "../dto/patient.dto";
import { Patient } from "../model/patient.model";
import { Person } from "../model/person.model";
import { PatientMapper } from "../mapper/patient.mapper";
import { sequelize } from "../database/sequelize";

export class PatientRepository implements IRepositoryInheritance<PatientDTO, PatientDTOFull> {

    async findById(id: number): Promise<PatientDTO | null> {
        return Patient.findByPk(id, { include: [Person] }).then(patient => PatientMapper.mapToDto(patient))
    }

    async findAll(): Promise<PatientDTO[]> {
        return Patient.findAll({ include: [Person] }).then((patients: Patient[]) => patients.map((patient: Patient) => PatientMapper.mapToDto(patient)))
    }

    async create(data: PatientDTOFull): Promise<PatientDTO> {

        const personInfo = {
            secu_number: data.secu_number,
            lastname: data.lastname,
            firstname: data.firstname,
            mail: data.mail,
            password: data.password,
            birthdate: data.birthdate,
            phone_number: data.phone_number,
            description: data.description,
            avatar: data.avatar
        }

        const patientInfo = {
            secu_number: data.secu_number
        }

        try {
            return await sequelize.transaction(async (t) => {

                const newPerson = await Person.create(
                    personInfo,
                    { transaction: t }
                )

                return Patient.create(
                    { ...patientInfo, patient_id: newPerson.person_id },
                    { transaction: t }
                )
                    .then((patient: Patient) => PatientMapper.mapToDtoCreate(patient, newPerson))
            })

        } catch (error: any) {
            console.log(error)
            return null as any
        }
    }

    async update(data: PatientDTOFull, id: number): Promise<boolean | number> {

        const personInfo = {
            lastname: data.lastname,
            firstname: data.firstname,
            mail: data.mail,
            password: data.password,
            birthdate: data.birthdate,
            phone_number: data.phone_number,
            description: data.description,
            avatar: data.avatar
        }

        const patientInfo = {
            secu_number: data.secu_number
        }

        try {
            return await sequelize.transaction(async (t) => {

                await Person.update(
                    personInfo,
                    {
                        where: { person_id: id },
                        transaction: t
                    }
                )

                const updatedPatient = await Patient.update(
                    patientInfo,
                    {
                        where: { patient_id: id },
                        transaction: t
                    }
                )
                return updatedPatient[0]
            })

        } catch (error) {
            throw error
        }
    }


    async delete(id: number): Promise<boolean | number> {
        return Patient.destroy({ where: { patient_id: id } }).then(good => good)
    }

}