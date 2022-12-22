import { IRepository, IRepositoryInheritance } from "../core/respository.interface";
import { DoctorDTO, DoctorDTOFull } from "../dto/doctor.dto";
import { Doctor } from "../model/doctor.model";
import { Person } from "../model/person.model";
import { DoctorMapper } from "../mapper/doctor.mapper";
import { sequelize } from "../database/sequelize";

export class DoctorRepository implements IRepositoryInheritance<DoctorDTO, DoctorDTOFull> {

    async findById(id: number): Promise<DoctorDTO | null> {
        return Doctor.findByPk(id, { include: [Person] }).then(doctor => DoctorMapper.mapToDto(doctor))
    }

    async findAll(): Promise<DoctorDTO[]> {
        // return Doctor.findAll({ include: [Person] }).then((doctors: Doctor[]) => doctors.map(doctor => DoctorMapper.mapToDtoTEST(doctor)))
        return Doctor.findAll({ include: [Person] }).then((doctors: Doctor[]) => DoctorMapper.mapAllToDto(doctors))
    }

    async create(doctorInfo: DoctorDTOFull): Promise<DoctorDTO | null | undefined> {
        const personInfo = {
            lastname: doctorInfo.lastname,
            firstname: doctorInfo.firstname,
            mail: doctorInfo.mail,
            password: doctorInfo.password,
            birthdate: doctorInfo.birthdate,
            phone_number: doctorInfo.phone_number,
            description: doctorInfo.description,
            avatar: doctorInfo.avatar
        }

        const doctorOnlyInfo = {
            activity: doctorInfo.activity
        }
        try {
            await sequelize.transaction(async (t: any) => {

                const newPerson = await Person.create(
                    personInfo ,
                    { transaction: t }
                )

                return Doctor.create(
                    { ...doctorOnlyInfo, doctor_id: newPerson.person_id} ,
                    { transaction: t }
                )
                .then((doctor: Doctor) => DoctorMapper.mapToDtoCreate(doctor, newPerson))
            })

        } catch (error: any) {
            console.log(error)
            return null
        }
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}