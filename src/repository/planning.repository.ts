import { IRepository } from "../core/respository.interface";
import { PlanningDTO } from "../dto/planning.dto";
import { Planning } from "../database/connect";
import { PlanningMapper } from "../mapper/planning.mapper";

export class PlanningRepository implements IRepository<PlanningDTO> {

    async findById(id: number): Promise<PlanningDTO | null> {
        // TODO
        return Planning.findByPk(id).then(planning => PlanningMapper.mapToDto(planning))
    }

    findAll(): Promise<PlanningDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: PlanningDTO): Promise<PlanningDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}