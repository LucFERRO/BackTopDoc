import { DoctorDTO } from "../dto/doctor.dto"
import { Doctor } from "../model/doctor.model";

export class DoctorMapper {
    static mapToDto(doctor: Doctor | null): DoctorDTO | null {
        if (doctor === null) return null;
        return {
            activity: doctor.activity,
        }
    }

    static mapAllToDto(doctors: Doctor[]): DoctorDTO[] {
        return doctors.map(doctor => {
            return  {
                activity: doctor.activity,
            }
        })
    }

}