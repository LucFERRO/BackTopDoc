import { PlanningDTO } from "../dto/planning.dto"
import { planningTypes } from "../type/planning"

export class PlanningMapper {
    static mapToDto(planning: planningTypes | null): PlanningDTO | null {
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