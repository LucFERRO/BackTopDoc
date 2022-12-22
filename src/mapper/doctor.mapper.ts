import { DoctorDTO } from "../dto/doctor.dto"
import { Doctor } from "../model/doctor.model";
import { Person } from "../model/person.model";

export class DoctorMapper {
    static mapToDto(doctor: Doctor | null): DoctorDTO | null {
        if (doctor === null) return null;
        return {
            activity: doctor.activity,
            lastname: doctor.get({ plain: true }).Person.lastname,
            firstname: doctor.get({ plain: true }).Person.firstname,
            birthdate: doctor.get({ plain: true }).Person.birthdate,
            mail: doctor.get({ plain: true }).Person.mail,
            phone_number: doctor.get({ plain: true }).Person.phone_number,
            description: doctor.get({ plain: true }).Person.description,
            avatar: doctor.get({ plain: true }).Person.avatar,
        }
    }

    static mapToDtoTEST(doctor: Doctor): DoctorDTO {
        console.log('coucou',doctor)
        return {
            activity: doctor.activity,
            lastname: doctor.get({ plain: true }).Person.lastname,
            firstname: doctor.get({ plain: true }).Person.firstname,
            birthdate: doctor.get({ plain: true }).Person.birthdate,
            mail: doctor.get({ plain: true }).Person.mail,
            phone_number: doctor.get({ plain: true }).Person.phone_number,
            description: doctor.get({ plain: true }).Person.description,
            avatar: doctor.get({ plain: true }).Person.avatar,
        }
    }

    static mapToDtoCreate(doctor: Doctor, person : Person): DoctorDTO {
        console.log('coucou gaetan',person)
        return {
            activity: doctor.activity,
            lastname: person.lastname, 
            firstname: person.firstname,
            birthdate: person.birthdate,
            mail: person.mail,
            phone_number: person.phone_number,
            description: person.description,
            avatar: person.avatar,
        }
    }

    static mapAllToDto(doctors: Doctor[]): DoctorDTO[] {
        return doctors.map(doctor => {
            return  {
                activity: doctor.activity,
                lastname: doctor.get({ plain: true }).Person.lastname,
                firstname: doctor.get({ plain: true }).Person.firstname,
                birthdate: doctor.get({ plain: true }).Person.birthdate,
                mail: doctor.get({ plain: true }).Person.mail,
                phone_number: doctor.get({ plain: true }).Person.phone_number,
                description: doctor.get({ plain: true }).Person.description,
                avatar: doctor.get({ plain: true }).Person.avatar,
            }
        })
    }

}