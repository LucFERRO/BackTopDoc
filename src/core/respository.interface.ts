import { PersonDTOFull } from "../dto/person.dto";
import { TokenDTO } from "../dto/token.dto";

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T>;
    update(data : T,id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean >;
}

export interface IRepositoryInheritance<T, D> {
    findAll(options?: any): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: D): Promise<T | undefined>;
    update(t: Partial<D>, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface IRepositoryPerson {
    findByMail(mail: string): Promise<PersonDTOFull | null>;
}

export interface IRepositoryToken {
    findAll(): Promise<TokenDTO[]>;
    create(t: TokenDTO, person_id: number): Promise<TokenDTO | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface IRepositoryPlanning<T> {
    findAllOfGivenDoctor(doctor_id: number): Promise<T[]>;
    create(data: T, doctor_id: number): Promise<T>;
    update(t: Partial<T>, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}