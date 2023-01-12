import { PlanningDTO } from "../dto/planning.dto"
import { Planning } from "../model/planning.model";
import { WorkdayMapper } from "./workday.mapper";

export class PlanningMapper {
    static mapToDto(planning: Planning): PlanningDTO {
        return {
            planning_name: planning.planning_name,
            planning_start: planning.planning_start,
            planning_end: planning.planning_end,
            doctor_id: planning.doctor_id,
            workdays: WorkdayMapper.mapAllToDto(planning.get({plain: true}).workdays)
        }
    }

    static mapAllToDto(plannings: Planning[]): PlanningDTO[] {
        return plannings.map(planning => {
            return  {
                planning_name: planning.planning_name,
                planning_start: planning.planning_start,
                planning_end: planning.planning_end,
                doctor_id: planning.doctor_id,
                workdays: WorkdayMapper.mapAllToDto(planning.get({plain: true}).workdays)
            }
        })
    }
}