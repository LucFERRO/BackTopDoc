import { PersonDTO } from "../models/person.dto";
import { IRepository } from "../../core/respository.interface";

export class PersonService {

    private personRepository: IRepository<PersonDTO>;

    constructor(_personRepository : IRepository<PersonDTO>) {
        this.personRepository = _personRepository;
    }

    async findById(id: number): Promise<PersonDTO | null>{
        return this.personRepository.findById(id).then(personDto => {
            if (personDto === null) return null;
            personDto.nom = "M. " + personDto.nom;
            return personDto;
        });
    }

}