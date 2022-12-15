import { IRepository } from "../core/respository.interface";
import { Person2DTO } from "../dto/person2.dto";
import { Person2Mapper } from "../mapper/person2.mapper";
import { Person2 } from "../model2/person.model";

export class Person2Repository implements IRepository<Person2DTO> {

    async findById(id: number): Promise<Person2DTO | null> {
        return Person2.findByPk(id).then((person : Person2 | null ) => Person2Mapper.mapToDto(person))
    }

    async findAll(): Promise<Person2DTO[]> {
        return Person2.findAll().then((persons: Person2[]) => Person2Mapper.mapAllToDto(persons))
    }

    create(t: Person2DTO): Promise<Person2DTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}