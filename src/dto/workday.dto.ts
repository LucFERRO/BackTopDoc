export interface WorkdayDTO {
    planning_id?: number,
    workday_number: number,
    workday_start: Date,
    workday_end: Date,
    slot_duration_minutes: number,
}