import { IRepositoryVacation } from "../core/respository.interface";
import { VacationIService } from "../core/service.interface";
import { VacationDTO } from "../dto/vacation.dto";

export class VacationService implements VacationIService {

    private vacationRepository: IRepositoryVacation;

    constructor(vacationRepository: IRepositoryVacation) {
        this.vacationRepository = vacationRepository;
    }
    
    async findAll(): Promise<VacationDTO[]> {
        return this.vacationRepository.findAll()
    }
    async findVacations(doctor_id: number): Promise<VacationDTO[]> {
        return this.vacationRepository.findVacations(doctor_id)
    }
    async create(t: VacationDTO): Promise<VacationDTO | undefined> {
        throw new Error("Method not implemented.");
    }
    async update(t: VacationDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }


}