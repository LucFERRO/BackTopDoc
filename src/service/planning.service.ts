import { IRepositoryPlanning } from "../core/respository.interface";
import { PlanningIService } from "../core/service.interface";
import { PlanningDTO } from "../dto/planning.dto";
import { WorkdayDTO } from "../dto/workday.dto";
import { Person } from "../model/person.model";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";

export class PlanningService implements PlanningIService {

    private planningRepository: IRepositoryPlanning;

    constructor(_planningRepository: IRepositoryPlanning) {
        this.planningRepository = _planningRepository;
    }

    async findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]> {
        return this.planningRepository.findAllOfGivenDoctor(doctor_id)
    }

    async create(planningData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO> {
        return this.planningRepository.create(planningData, workdaysData)
    }
    async update(data: PlanningDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}