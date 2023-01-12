import { IRepositoryPlanning } from "../core/respository.interface";
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

    constructor(_planningRepository: IRepositoryPlanning) {
        this.planningRepository = _planningRepository;
    }

    async findAllOfGivenDoctor(doctor_id: number): Promise<PlanningDTO[]> {
        return this.planningRepository.findAllOfGivenDoctor(doctor_id)
    }

    async create(planningData: PlanningDTO, workdaysData: WorkdayDTO[]): Promise<PlanningDTO> {
        return this.planningRepository.create(planningData, workdaysData)
    }
    async planningDetail(planning_id: number): Promise<any> {
        try {
            const planningRawData = await this.planningRepository.planningDetail(planning_id)

            let planningData : any = {
                planning_name: planningRawData.planning_name,
                Lundi: {
                    start: planningRawData.workdays[0].workday_start,
                    slot: planningRawData.workdays[0].slot_duration_minutes
                }
            }

            for (let i=0; i < planningRawData.workdays.length; i++) {
                const slot_duration = planningRawData.workdays[i].slot_duration_minutes
                const day_detail = [
                    planningRawData.workdays[i].workday_start.slice(0,-3)
                ]
                let current = timeToNumber(planningRawData.workdays[i].workday_start)

                while(current+slot_duration < timeToNumber(planningRawData.workdays[i].workday_end)) {
                    day_detail.push(numberToTime(current+slot_duration))
                    current = current+slot_duration
                }

                planningData = { ...planningData, [dayIdToName[planningRawData.workdays[i].workday_number]]: day_detail}
            }



            //     for (let i = 0; i < numbersOfDays; i++) {
            //         await Workday.create(
            //             { ...workdaysData[i], planning_id: newPlanning.planning_id },
            //             { transaction: t }
            //         )
            //     }


            return planningData
        } catch (error) {
            throw error
        }

        return
    }
    async update(data: PlanningDTO, id: number): Promise<number | boolean | undefined> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<number | boolean> {
        throw new Error("Method not implemented.");
    }

}