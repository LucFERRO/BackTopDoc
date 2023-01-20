import { IRepositoryAppointement } from "../core/respository.interface";
import { AppointementIService } from "../core/service.interface";
import { AppointementDTO } from "../dto/appointement.dto";
import { PlanningDTO } from "../dto/planning.dto";
const bcrypt = require("bcrypt");

export class AppointementService implements AppointementIService {

    private appointementRepository: IRepositoryAppointement;

    constructor(_appointementRepository: IRepositoryAppointement) {
        this.appointementRepository = _appointementRepository;
    }
    async appointementList(doctor_id: any): Promise<AppointementDTO[]> {
        return this.appointementRepository.findByDoctorId(doctor_id)
    }
    async findGlobal(data: any): Promise<AppointementDTO[]> {
        return this.appointementRepository.findGlobal(data)
    }
    async create(data: AppointementDTO): Promise<AppointementDTO> {
        return this.appointementRepository.create(data)
    }
    async update(t: AppointementDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}