import { IRepositoryPerson } from "../core/respository.interface";
import { PersonDTOFull } from "../dto/person.dto";
import { Person } from "../model/person.model";
import { PersonMapper } from "../mapper/person.mapper";

export class PersonRepository implements IRepositoryPerson {

    async findByMail(mail: string): Promise<PersonDTOFull | null> {
        return Person.findOne({ where: { mail: mail } }).then((person : Person | null ) => PersonMapper.mapToDto(person))
    }

}