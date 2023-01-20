import { IRepository } from "../core/respository.interface";
import { VacationDTO } from "../dto/vacation.dto";
import { Vacation } from "../model/vacation.model";
import { VacationMapper } from "../mapper/vacation.mapper";

export class VacationRepository implements IRepository<VacationDTO> {
    
    async findAll(): Promise<VacationDTO[]> {
        return Vacation.findAll().then(vacations => VacationMapper.mapAllToDto(vacations))
    }
    async findById(doctor_id: number): Promise<VacationDTO | null> {
        return Vacation.findOne({where: {doctor_id: doctor_id}}).then(vacation => VacationMapper.mapToDto(vacation))
    }
    
    async update(data: VacationDTO, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(t: VacationDTO): Promise<VacationDTO> {
        throw new Error("Method not implemented.");
    }


}