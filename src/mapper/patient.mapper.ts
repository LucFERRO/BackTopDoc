import { PatientDTO } from "../dto/patient.dto"
import { Patient } from "../model/patient.model";
import { Person } from "../model/person.model";

export class PatientMapper {
    static mapToDto(patient: Patient | null): PatientDTO {
        if (patient === null) return null as any;
        return {
            secu_number: patient.secu_number,
            lastname: patient.get({ plain: true }).Person.lastname,
            firstname: patient.get({ plain: true }).Person.firstname,
            birthdate: patient.get({ plain: true }).Person.birthdate,
            mail: patient.get({ plain: true }).Person.mail,
            phone_number: patient.get({ plain: true }).Person.phone_number,
            description: patient.get({ plain: true }).Person.description,
            avatar: patient.get({ plain: true }).Person.avatar,
        }
    }

    static mapToDtoCreate(patient: Patient, person : Person): PatientDTO {
        return {
            secu_number: patient.secu_number,
            lastname: person.lastname, 
            firstname: person.firstname,
            birthdate: person.birthdate,
            mail: person.mail,
            phone_number: person.phone_number,
            description: person.description,
            avatar: person.avatar,
        }
    }
}