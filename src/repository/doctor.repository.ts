import { IRepository, IRepositoryInheritance } from "../core/respository.interface";
import { DoctorDTO, DoctorDTOFull } from "../dto/doctor.dto";
import { Doctor } from "../model/doctor.model";
import { Person } from "../model/person.model";
import { DoctorMapper } from "../mapper/doctor.mapper";
import { sequelize } from "../database/sequelize";
import { Transaction } from "sequelize";

export class DoctorRepository implements IRepositoryInheritance<DoctorDTO, DoctorDTOFull> {
    async findById(id: number): Promise<DoctorDTO | null> {
        return Doctor.findByPk(id, { include: [Person] }).then(doctor => DoctorMapper.mapToDto(doctor))
    }

    async findAll(): Promise<DoctorDTO[]> {
        return Doctor.findAll({ include: [Person] }).then((doctors: Doctor[]) => doctors.map((doctor: Doctor) => DoctorMapper.mapToDto(doctor)))
    }

    async create(data: DoctorDTOFull): Promise<DoctorDTO | undefined> {

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

        const doctorInfo = {
            activity: data.activity
        }
        try {
            await sequelize.transaction(async (t: Transaction) => {

                const newPerson = await Person.create(
                    personInfo,
                    { transaction: t }
                )

                return Doctor.create(
                    { ...doctorInfo, doctor_id: newPerson.person_id },
                    { transaction: t }
                )
                    .then((doctor: Doctor) => DoctorMapper.mapToDtoCreate(doctor, newPerson))
            })

        } catch (error: any) {
            console.log(error)
            return null as any
        }
    }

    async update(data: DoctorDTOFull, id: number): Promise<boolean | number | undefined> {
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

        const doctorInfo = {
            activity: data.activity
        }
        try {
            await sequelize.transaction(async (t) => {

                await Person.update(
                    personInfo,
                    {
                        where: { person_id: id },
                        // returning: true,
                        // plain: true,
                        transaction: t
                    }
                )

                const updatedDoctor = await Doctor.update(
                    doctorInfo,
                    {
                        where: { doctor_id: id },
                        // returning: true,
                        // plain: true,
                        transaction: t
                    }
                    )
                console.log('repo', updatedDoctor)
                return updatedDoctor[0]
            })

        } catch (error: any) {
            console.log(error)
            return null as any
        }
    }

    async delete(id: number): Promise<boolean | number> {
        return Doctor.destroy({ where: { doctor_id: id } }).then(good => good)
    }

}