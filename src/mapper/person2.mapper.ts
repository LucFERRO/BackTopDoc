import { Person2DTO } from "../dto/person2.dto"
import { Person2 } from "../model2/person.model";

export class Person2Mapper {
    static mapToDto(person: Person2 | null): Person2DTO | null {
        if (person === null) return null;
        const dto: Person2DTO = {
            lastname: person.lastname,
            firstname: person.firstname
        }
        return dto;
    }

    static mapAllToDto(persons: Person2[]): Person2DTO[] {
        return persons.map(person => {
            return  {
                lastname: person.lastname,
                firstname: person.firstname
            }
        })
    }

    static mapToModel() {

    }

}