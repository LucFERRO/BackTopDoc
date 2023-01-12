import { WorkdayDTO } from "../dto/workday.dto"
import { Workday } from "../model/workday.model";

export class WorkdayMapper {
    static mapToDto(workday: Workday | null): WorkdayDTO | null {
        if (workday === null) return null;
        return {
            workday_number: workday.workday_number,
            workday_start: workday.workday_start.slice(0,-3),
            workday_end: workday.workday_end.slice(0,-3),
            slot_duration_minutes: workday.slot_duration_minutes,
            lunch_break_start: workday.lunch_break_start.slice(0,-3),
            lunch_break_end: workday.lunch_break_end.slice(0,-3)
        }
    }

    static mapAllToDto(workdays: Workday[]): WorkdayDTO[] {
        return workdays.map(workday => {
            return  {
                workday_number: workday.workday_number,
                workday_start: workday.workday_start.slice(0,-3),
                workday_end: workday.workday_end.slice(0,-3),
                slot_duration_minutes: workday.slot_duration_minutes,
                lunch_break_start: workday.lunch_break_start.slice(0,-3),
                lunch_break_end: workday.lunch_break_end.slice(0,-3)
            }
        })
    }

}