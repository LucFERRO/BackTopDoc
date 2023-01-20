import { IRepository } from "../core/respository.interface";
import { VacationDTO } from "../dto/vacation.dto";
import { Vacation } from "../model/vacation.model";
import { VacationMapper } from "../mapper/vacation.mapper";

export class VacationRepository implements IRepository<VacationDTO> {
    async update(data: VacationDTO, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<VacationDTO | null> {
        return Vacation.findByPk(id).then(vacation => VacationMapper.mapToDto(vacation))
    }

    async findAll(): Promise<VacationDTO[]> {
        return Vacation.findAll().then(vacations => VacationMapper.mapAllToDto(vacations))
    }

    async create(t: VacationDTO): Promise<VacationDTO> {
        throw new Error("Method not implemented.");
    }


}