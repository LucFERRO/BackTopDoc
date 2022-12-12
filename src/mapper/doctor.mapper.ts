import { DoctorDTO } from "../dto/doctor.dto"
import { doctorTypes } from "../type/doctor"
import { DoctorModel } from "../model/doctor";
import { Doctor } from "../database/connect"

export class DoctorMapper {
    // TODO
    static mapToDto(doctor: Doctor | null): DoctorDTO | null {
        if (doctor === null) return null;
        const dto: DoctorDTO = {
            activity: doctor.activity,
        }
        return dto;
    }

    static mapToModel() {

    }

}