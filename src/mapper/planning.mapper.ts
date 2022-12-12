import { PlanningDTO } from "../dto/planning.dto"
import { planningTypes } from "../type/planning"
import { PlanningModel } from "../model/planning";
import { Planning } from "../database/connect"

export class PlanningMapper {
    // TODO
    static mapToDto(planning: Planning | null): PlanningDTO | null {
        if (planning === null) return null;
        const dto: PlanningDTO = {
            planning_name: planning.planning_name,
            planning_start: planning.planning_start,
            planning_end: planning.planning_end,
        }
        return dto;
    }

    static mapToModel() {

    }

}