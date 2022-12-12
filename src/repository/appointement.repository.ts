import { IRepository } from "../core/respository.interface";
import { AppointementDTO } from "../dto/appointement.dto";
import { Appointement } from "../database/connect";
import { AppointementMapper } from "../mapper/appointement.mapper";

export class AppointementRepository implements IRepository<AppointementDTO> {

    async findById(id: number): Promise<AppointementDTO | null> {
        return Appointement.findByPk(id).then(appointement => AppointementMapper.mapToDto(appointement))
    }

    findAll(): Promise<AppointementDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: AppointementDTO): Promise<AppointementDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}