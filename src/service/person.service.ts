import { PersonDTOFull } from "../dto/person.dto";
import { IRepositoryPerson } from "../core/respository.interface";
import { PersonIService } from "../core/service.interface";
const bcrypt = require("bcrypt");

export class PersonService implements PersonIService {

    private personRepository: IRepositoryPerson;

    constructor(_personRepository: IRepositoryPerson) {
        this.personRepository = _personRepository;
    }

    async findByMail(mail: string): Promise<PersonDTOFull | null> {
        return this.personRepository.findByMail(mail)
    }

}