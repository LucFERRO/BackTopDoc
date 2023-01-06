import { PersonDTOFull } from "../dto/person.dto";
import { PlanningDTO } from "../dto/planning.dto";

export interface IService<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(t: T): Promise<T | undefined>;
    update(t: T, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface PersonIService {
    findByMail(mail: string): Promise<PersonDTOFull | null>;
}

export interface AuthIService<D,T> {
    login(d:D): Promise<D>;
    refreshToken(t:T): Promise<Partial<T>>
}

export interface PlanningIService {
    create(data: PlanningDTO, doctor_id: number): Promise<PlanningDTO>;
    findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]>;
    update(t: Partial<PlanningDTO>, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}