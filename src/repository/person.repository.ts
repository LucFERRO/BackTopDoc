import { IRepository } from "../core/respository.interface";
import { PersonDTO } from "../dto/person.dto";
import { Person } from "../database/connect";
import { personTypes } from "../type/person";
import { PersonMapper } from "../mapper/person.mapper";

export class PersonRepository implements IRepository<PersonDTO> {

    async findById(id: number): Promise<PersonDTO | null> {
        //TODO voir pourquoi any au lieu de personTypes
        return Person.findByPk(id).then((person:any) => PersonMapper.mapToDto(person))
    }

    async findAll(): Promise<PersonDTO[]> {
        //TODO voir pourquoi any au lieu de personTypes
        return Person.findAll().then((persons: any) => persons.map((person : personTypes) => PersonMapper.mapToDto(person)))
    }

    // async findAll(): Promise<userDTO[]> {
    //     return User.findAll().then((users: userId[]) => users.map((user: userId) => UserMapper.mapToDto(user)))
    //  }

    create(t: PersonDTO): Promise<PersonDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}