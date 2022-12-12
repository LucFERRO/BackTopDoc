import { PersonDTO } from "../models/person.dto";
import { Person } from "../models/person.model";
import { PersonMapper } from "../models/person.mapper";
import { IRepository } from "../../core/respository.interface";

export class PersonRepository implements IRepository<PersonDTO> {

    async findById(id: number): Promise<PersonDTO | null> {
        return Person.findByPk(id).then(person => PersonMapper.mapToDto(person))
    }

    findAll(): Promise<PersonDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: PersonDTO): Promise<PersonDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



}