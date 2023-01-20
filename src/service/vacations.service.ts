import { IRepository } from "../core/respository.interface";
import { IService } from "../core/service.interface";
import { VacationDTO } from "../dto/vacation.dto";

export class VacationService implements IService<VacationDTO> {

    private vacationRepository: IRepository<VacationDTO>;

    constructor(vacationRepository: IRepository<VacationDTO>) {
        this.vacationRepository = vacationRepository;
    }

    findAll(): Promise<VacationDTO[]> {
        return this.vacationRepository.findAll()
    }
    findById(doctor_id: number): Promise<VacationDTO | null> {
        return this.vacationRepository.findById(doctor_id)
    }
    create(t: VacationDTO): Promise<VacationDTO | undefined> {
        throw new Error("Method not implemented.");
    }
    update(t: VacationDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }


}