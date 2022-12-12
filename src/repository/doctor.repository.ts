import { IRepository } from "../core/respository.interface";
import { DoctorDTO } from "../dto/doctor.dto";
import { Doctor } from "../database/connect";
import { DoctorMapper } from "../mapper/doctor.mapper";

export class DoctorRepository implements IRepository<DoctorDTO> {

    async findById(id: number): Promise<DoctorDTO | null> {
        return Doctor.findByPk(id).then(doctor => DoctorMapper.mapToDto(doctor))
    }

    findAll(): Promise<DoctorDTO[]> {
        throw new Error("Method not implemented.");
    }

    create(t: DoctorDTO): Promise<DoctorDTO> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}