import { IRepositoryAppointement } from "../core/respository.interface";
import { AppointementDTO } from "../dto/appointement.dto";
import { Appointement } from "../model/appointement.model";
import { AppointementMapper } from "../mapper/appointement.mapper";
import { PlanningDTO } from "../dto/planning.dto";
import { Doctor } from "../model/doctor.model";

export class AppointementRepository implements IRepositoryAppointement {
    async findAllOfGivenPerson(data: any): Promise<any> {
        return Appointement.findAll({ where: data }).then(appointement => appointement)
    }

    async create(data: AppointementDTO): Promise<AppointementDTO> {

        try {

            const newAppointement = await Appointement.create({
                appointement_date: data.appointement_date,
                doctor_id: data.doctor_id,
                patient_id: data.patient_id,
                appointement_duration_minutes: data.appointement_duration_minutes,
                appointement_reason: data.appointement_reason
            })
            return newAppointement

        } catch (error: any) {
            // console.log('Error in repository', error)
            throw new Error(error)
        }
    }


    async update(data: AppointementDTO, id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}