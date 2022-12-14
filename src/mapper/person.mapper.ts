import { PersonDTO } from "../dto/person.dto"
import { personTypes } from "../type/person"

export class PersonMapper {
    static mapToDto(person: personTypes | null): PersonDTO | null {
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