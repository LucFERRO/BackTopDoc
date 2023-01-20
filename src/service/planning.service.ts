import { IRepositoryAppointement, IRepositoryPlanning } from "../core/respository.interface";
import { PlanningIService } from "../core/service.interface";
import { PlanningDTO } from "../dto/planning.dto";
import { WorkdayDTO } from "../dto/workday.dto";
import { numberToTime, timeToNumber } from "../core/methods";
import { Person } from "../model/person.model";
import { Planning } from "../model/planning.model";
import { Workday } from "../model/workday.model";

const dayIdToName = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export class PlanningService implements PlanningIService {

    private planningRepository: IRepositoryPlanning;
    // private vacationRepository: any;
    private appointementRepository: IRepositoryAppointement;

    constructor(_planningRepository: IRepositoryPlanning, _appointementRepository: IRepositoryAppointement) {
        this.planningRepository = _planningRepository;
        this.appointementRepository = _appointementRepository
    }

    async findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]> {
        return this.planningRepository.findAllOfGivenDoctor(doctor_id)
    }

    async create(planningData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO> {
        return this.planningRepository.create(planningData, workdaysData)
    }
    async availableSlots(doctor_id: number): Promise<any> {
        try {
            const planningRawData = await this.planningRepository.availableSlots(doctor_id)

            let planningData: any = {
                planning_name: planningRawData.planning_name,
            }
            let slot_durations = []

            for (let i = 0; i < planningRawData.workdays.length; i++) {
                const slot_duration: number = planningRawData.workdays[i].slot_duration_minutes
                const day_detail = [
                    planningRawData.workdays[i].workday_start
                ]
                let current = timeToNumber(planningRawData.workdays[i].workday_start)


                while (current + 2 * slot_duration <= timeToNumber(planningRawData.workdays[i].workday_end)) {
                    if (current > timeToNumber(planningRawData.workdays[i].lunch_break_end) || current + slot_duration < timeToNumber(planningRawData.workdays[i].lunch_break_start)) {
                        day_detail.push(numberToTime(current + slot_duration))
                    }
                    current = current + slot_duration

                }

                slot_durations.push(slot_duration)
                planningData = { ...planningData, [dayIdToName[planningRawData.workdays[i].workday_number]]: day_detail }
            }
            planningData = { ...planningData, slot_durations}
            return planningData
        } catch (error) {
            throw error
        }
    }
    async availabilities(doctor_id: number): Promise<any> {
        try {
            const planningRawData = await this.planningRepository.availableSlots(doctor_id)

            let planningData: any = {
                planning_name: planningRawData.planning_name,
            }
            let slot_durations = []

            for (let i = 0; i < planningRawData.workdays.length; i++) {
                const slot_duration: number = planningRawData.workdays[i].slot_duration_minutes
                const day_detail = [
                    planningRawData.workdays[i].workday_start
                ]
                let current = timeToNumber(planningRawData.workdays[i].workday_start)


                while (current + 2 * slot_duration <= timeToNumber(planningRawData.workdays[i].workday_end)) {
                    if (current > timeToNumber(planningRawData.workdays[i].lunch_break_end) || current + slot_duration < timeToNumber(planningRawData.workdays[i].lunch_break_start)) {
                        day_detail.push(numberToTime(current + slot_duration))
                    }
                    current = current + slot_duration

                }

                slot_durations.push(slot_duration)
                planningData = { ...planningData, [dayIdToName[planningRawData.workdays[i].workday_number]]: day_detail }
            }
            planningData = { ...planningData, slot_durations}
            return planningData
        } catch (error) {
            throw error
        }
    }


    async update(data: PlanningDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}