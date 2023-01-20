import { IRepositoryVacation } from "../core/respository.interface";
import { VacationDTO } from "../dto/vacation.dto";
import { Vacation } from "../model/vacation.model";
import { VacationMapper } from "../mapper/vacation.mapper";

export class VacationRepository implements IRepositoryVacation {
    
    async findAll(): Promise<VacationDTO[]> {
        return Vacation.findAll().then(vacations => VacationMapper.mapAllToDto(vacations))
    }
    async findVacations(doctor_id: number): Promise<VacationDTO[]> {
        return Vacation.findAll({where: {doctor_id: doctor_id}}).then(vacations => VacationMapper.mapAllToDto(vacations))
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