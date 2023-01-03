import { PersonDTO } from "../dto/person.dto";
import { IRepositoryPerson } from "../core/respository.interface";
import { PersonIService } from "../core/service.interface";
const bcrypt = require("bcrypt");

export class PersonService implements PersonIService<PersonDTO> {

    private personRepository: IRepositoryPerson<PersonDTO>;

    constructor(_personRepository: IRepositoryPerson<PersonDTO>) {
        this.personRepository = _personRepository;
    }

    async findByMail(mail: string): Promise<PersonDTO | null> {
        return this.personRepository.findByMail(mail)
    }

}