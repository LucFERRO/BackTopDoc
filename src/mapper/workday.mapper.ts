import { WorkdayDTO } from "../dto/workday.dto"
import { workdayTypes } from "../type/workday"
import { WorkdayModel } from "../model/workday";
import { Workday } from "../database/connect"

export class WorkdayMapper {
    // TODO
    static mapToDto(workday: Workday | null): WorkdayDTO | null {
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