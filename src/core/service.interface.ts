import { AppointementDTO } from "../dto/appointement.dto";
import { PersonDTOFull } from "../dto/person.dto";
import { PlanningDTO } from "../dto/planning.dto";
import { WorkdayDTO } from "../dto/workday.dto";

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
    refreshToken(t:T): Promise<T>
}

export interface PlanningIService {
    findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]>;
    create(planningData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO>;
    planningDetail(planning_id: number): Promise<PlanningDTO>;
    update(t: PlanningDTO, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}

export interface AppointementIService {
    findAllOfGivenPerson(person_id: any): Promise<AppointementDTO[]>;
    create(data: AppointementDTO): Promise<AppointementDTO>;
    update(t: AppointementDTO, id: number): Promise<boolean | number | undefined>;
    delete(id: number): Promise<boolean | number>;
}