import { VacationDTO } from "../dto/vacation.dto"
import { vacationTypes } from "../type/vacation"

export class VacationMapper {
    static mapToDto(vacation: vacationTypes | null): VacationDTO | null {
        if (vacation === null) return null;
        const dto: VacationDTO = {
            vacation_start: vacation.vacation_start,
            vacation_end: vacation.vacation_end
        }
        return dto;
    }

    static mapToModel() {

    }

}