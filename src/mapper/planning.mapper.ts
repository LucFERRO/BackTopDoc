import { PlanningDTO } from "../dto/planning.dto"
import { WorkdayDTO } from "../dto/workday.dto";
import { Planning } from "../model/planning.model";

export class PlanningMapper {
    static mapToDto(planning: PlanningDTO, workdayData: WorkdayDTO[]): PlanningDTO {
        return {
            planning_name: planning.planning_name,
            planning_start: planning.planning_start,
            planning_end: planning.planning_end,
            doctor_id: planning.doctor_id,
            WorkdaysInfo: workdayData
        }
    }

    static mapAllToDto(plannings: Planning[]): PlanningDTO[] {
        return plannings.map(planning => {
            return  {
                planning_name: planning.planning_name,
                planning_start: planning.planning_start,
                planning_end: planning.planning_end,
                doctor_id: planning.doctor_id,
                WorkdaysInfo: planning.get({plain: true}).Workdays
            }
        })
    }
}