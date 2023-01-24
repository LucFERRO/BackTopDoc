import { mergeArrayWithoutDupes } from "../core/methods";
import { IRepositoryAppointement } from "../core/respository.interface";
import { AppointementIService } from "../core/service.interface";
import { AppointementDTO } from "../dto/appointement.dto";
import { PlanningDTO } from "../dto/planning.dto";
import dayjs from "dayjs";
import toObject from 'dayjs/plugin/toObject'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(toObject)
dayjs.extend(relativeTime)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

export class AppointementService implements AppointementIService {

    private appointementRepository: IRepositoryAppointement;

    constructor(_appointementRepository: IRepositoryAppointement) {
        this.appointementRepository = _appointementRepository;
    }
    async doctorAppointementList(doctor_id: any): Promise<AppointementDTO[]> {
        return this.appointementRepository.findByDoctorId(doctor_id)
    }

    async patientAppointementList(patient_id: any): Promise<AppointementDTO[]> {
        return this.appointementRepository.findByPatientId(patient_id)
    }
    async findGlobal(data: any): Promise<AppointementDTO[]> {
        return this.appointementRepository.findGlobal(data)
    }
    async create(data: AppointementDTO): Promise<AppointementDTO> {

        const doctorAppointement = await this.appointementRepository.findByDoctorId(data.doctor_id)
        const patientAppointement = await this.appointementRepository.findByPatientId(data.patient_id)
        const uniqueArray = mergeArrayWithoutDupes(doctorAppointement, patientAppointement)

        const newAppointement = dayjs(data.appointement_date)

        const potentialConflicts = uniqueArray.find((appointement: any) => dayjs(appointement.appointement_date).isBefore(newAppointement.add(data.appointement_duration_minutes, 'minute')) && newAppointement.isBefore(dayjs(appointement.appointement_date).add(appointement.appointement_duration_minutes, 'minute')))
        if (potentialConflicts) throw Error('Specified appointement would conflict with an already existing appointement.')

        return this.appointementRepository.create(data)
    }
    async update(t: AppointementDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}