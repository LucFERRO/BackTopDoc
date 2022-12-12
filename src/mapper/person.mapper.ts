import { PersonDTO } from "../dto/person.dto"
import { personTypes } from "../type/person"
import { PersonModel } from "../model/person";
import { Person } from "../database/connect"

export class PersonMapper {
    // TODO
    static mapToDto(person: Person | null): PersonDTO | null {
        if (person === null) return null;
        const dto: PersonDTO = {
            lastname: person.lastname,
            firstname: person.firstname
        }
        return dto;
    }

    static mapToModel() {

    }

}