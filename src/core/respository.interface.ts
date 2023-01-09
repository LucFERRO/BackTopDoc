//Pas besoin ?
import { PersonDTOFull } from "../dto/person.dto";
import { PlanningDTO } from "../dto/planning.dto";
import { TokenDTO } from "../dto/token.dto";
import { WorkdayDTO } from "../dto/workday.dto";

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T>;
    update(data : T,id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean >;
}

export interface IRepositoryInheritance<T> {
    findAll(options?: any): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T | undefined>;
    update(t: T, id: number): Promise<boolean | number | undefined>;
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

export interface IRepositoryPlanning {
    findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]>;
    create(planningData: PlanningDTO, workdaysInfo: WorkdayDTO[]): Promise<PlanningDTO>;
    update(t: PlanningDTO, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}