import { IRepository, IRepositoryPerson } from "../core/respository.interface";
import { PersonDTO } from "../dto/person.dto";
import { Person } from "../model/person.model";
import { PersonMapper } from "../mapper/person.mapper";

export class PersonRepository implements IRepositoryPerson<PersonDTO> {

    async findByMail(mail: string): Promise<PersonDTO | null> {
        return Person.findOne({ where: { mail: mail } }).then((person : Person | null ) => PersonMapper.mapToDto(person))
    }

}