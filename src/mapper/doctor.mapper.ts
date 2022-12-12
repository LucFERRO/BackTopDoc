import { DoctorDTO } from "../dto/doctor.dto"
import { doctorTypes } from "../type/doctor"

export class DoctorMapper {
    static mapToDto(doctor: doctorTypes | null): DoctorDTO | null {
        if (doctor === null) return null;
        const dto: DoctorDTO = {
            activity: doctor.activity,
        }
        return dto;
    }

    static mapToModel() {

    }

}