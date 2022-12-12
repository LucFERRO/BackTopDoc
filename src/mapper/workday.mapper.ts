import { WorkdayDTO } from "../dto/workday.dto"
import { workdayTypes } from "../type/workday"

export class WorkdayMapper {
    static mapToDto(workday: workdayTypes | null): WorkdayDTO | null {
        if (workday === null) return null;
        const dto: WorkdayDTO = {
            workday_number: workday.workday_number,
            workday_start: workday.workday_start,
            workday_end: workday.workday_end,
            slot_duration_minutes: workday.slot_duration_minutes,
        }
        return dto;
    }

    static mapToModel() {

    }

}