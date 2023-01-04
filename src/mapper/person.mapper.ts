import { PersonDTOFull } from "../dto/person.dto"
import { Person } from "../model/person.model";

export class PersonMapper {
    static mapToDto(person: Person | null): PersonDTOFull | null {
        if (person === null) return null;
        return {
            person_id: person.person_id,
            lastname: person.lastname,
            firstname: person.firstname,
            password: person.password
        }
    }

    static mapAllToDto(persons: Person[]): PersonDTOFull[] {
        return persons.map(person => {
            return  {
                person_id: person.person_id,
                lastname: person.lastname,
                firstname: person.firstname,
                password: person.password
            }
        })
    }

}